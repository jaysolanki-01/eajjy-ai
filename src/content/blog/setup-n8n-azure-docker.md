---
title: "How to Setup N8n on Azure with Docker: A Complete Step-by-Step Guide"
date: "2026-07-04"
author: "Divyesh Solanki"
excerpt: "Learn exactly how to setup n8n on Azure with Docker. This complete guide covers everything from provisioning a VM to running n8n in production with SSL, persistent storage, and auto-restart."
tags: ["N8n", "Azure", "Docker", "Automation", "DevOps"]
read: "14 min read"
---

If you've decided to self-host n8n — the open-source workflow automation platform — Azure is one of the best places to run it. You get a reliable, scalable VM, easy DNS management, and a straightforward path to production. Docker makes the deployment clean, reproducible, and easy to maintain.

This guide walks you through the complete process: provisioning an Azure Virtual Machine, installing Docker, running n8n as a container, configuring persistent storage, setting up SSL with a reverse proxy, and making sure n8n restarts automatically if the server ever reboots.

By the end, you'll have a production-ready n8n instance running on Azure, accessible via your own domain with HTTPS.

---

## What you'll need before you start

Before you begin, make sure you have:

- An **Azure account** with an active subscription (a free trial works for testing)
- A **domain name** you control — you'll point a subdomain at your Azure VM (e.g. `n8n.yourdomain.com`)
- Basic comfort with the command line — every step is shown in full, but you'll be running SSH commands

If you don't have a domain yet, you can use Azure's auto-generated DNS name for testing (e.g. `yourvm.eastus.cloudapp.azure.com`), but you'll need a real domain for the SSL certificate.

---

## Part 1 — Provision an Azure Virtual Machine

### Step 1 — Create a VM in the Azure portal

Sign into the [Azure portal](https://portal.azure.com), click **Create a resource**, then **Virtual Machine**.

**Recommended settings:**
- **Image:** Ubuntu Server 22.04 LTS
- **Size:** Standard_B2s (2 vCPUs, 4 GB RAM) — adequate for most n8n deployments; upgrade to B4ms if you run heavy workflows
- **Authentication:** SSH public key (generate one or paste your existing public key)
- **Region:** Choose the one closest to your users

### Step 2 — Configure networking

On the Networking tab, make sure these ports are open in the Network Security Group:

- **Port 22** — SSH access (restrict to your IP in production)
- **Port 80** — HTTP (required for SSL certificate issuance)
- **Port 443** — HTTPS (where n8n will be accessible)

Click **Review + Create** and wait for deployment to complete (usually 1–2 minutes).

### Step 3 — Assign a static public IP

By default, Azure VMs get a dynamic public IP that can change on restart. To avoid this:

1. Go to your VM's overview page
2. Click the **Public IP address** link
3. Click **Configuration**
4. Change **Assignment** from Dynamic to **Static**
5. Click **Save**

Note the static IP address — you'll need it for DNS.

### Step 4 — Point your domain at the VM

In your DNS provider, create an **A record**:
- **Name:** `n8n` (or whatever subdomain you want)
- **Value:** your Azure VM's static IP address
- **TTL:** 300 (5 minutes is fine for setup)

DNS propagation typically takes a few minutes. You can verify with:

```bash
dig n8n.yourdomain.com
```

---

## Part 2 — Install Docker on the Azure VM

SSH into your new VM:

```bash
ssh azureuser@YOUR_VM_IP
```

### Step 5 — Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

### Step 6 — Install Docker

```bash
# Install dependencies
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add the Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### Step 7 — Add your user to the Docker group

This lets you run Docker commands without `sudo`:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

Verify Docker is running:

```bash
docker --version
docker run hello-world
```

You should see "Hello from Docker!" — Docker is installed correctly.

---

## Part 3 — Set up n8n with Docker

### Step 8 — Create a directory for n8n

```bash
mkdir -p ~/n8n-data
```

This directory will hold n8n's persistent data — workflows, credentials, and execution history. It survives container restarts and updates.

### Step 9 — Run n8n with Docker

```bash
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -v ~/n8n-data:/home/node/.n8n \
  -e N8N_HOST=n8n.yourdomain.com \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=https \
  -e NODE_ENV=production \
  -e WEBHOOK_URL=https://n8n.yourdomain.com/ \
  -e N8N_ENCRYPTION_KEY=your-random-32-char-key-here \
  docker.n8n.io/n8nio/n8n
```

**What each flag does:**
- `--restart unless-stopped` — n8n restarts automatically if the server reboots or the container crashes
- `-v ~/n8n-data:/home/node/.n8n` — mounts your persistent storage volume
- `N8N_HOST` — tells n8n what domain it's running on (used in webhook URLs)
- `N8N_ENCRYPTION_KEY` — encrypts your stored credentials; generate a random 32-character string and keep it safe

Generate a random encryption key:
```bash
openssl rand -hex 16
```

Verify the container is running:
```bash
docker ps
```

You should see n8n listed with status "Up". At this point n8n is running on port 5678, but it's not yet accessible via HTTPS. That's what the next part fixes.

---

## Part 4 — Set up Nginx and SSL

Running n8n directly on port 5678 without SSL is not suitable for production — your credentials would be sent unencrypted. Nginx acts as a reverse proxy that handles HTTPS and forwards traffic to n8n.

### Step 10 — Install Nginx and Certbot

```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 11 — Create the Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/n8n
```

Paste this configuration (replace `n8n.yourdomain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name n8n.yourdomain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
```

Enable the site and test the configuration:

```bash
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 12 — Issue an SSL certificate with Let's Encrypt

```bash
sudo certbot --nginx -d n8n.yourdomain.com
```

Certbot will prompt you for an email address, ask you to agree to the terms, and then automatically configure Nginx for HTTPS. When it's done, your Nginx config will be updated to redirect HTTP to HTTPS and serve the certificate.

Verify the certificate is working:
```bash
sudo certbot certificates
```

Let's Encrypt certificates expire after 90 days, but Certbot installs a cron job that auto-renews them. Test renewal works:

```bash
sudo certbot renew --dry-run
```

---

## Part 5 — Configure n8n for production

### Step 13 — Set up environment variables properly

For cleaner management, stop the container and use a Docker Compose file instead of a long `docker run` command:

```bash
docker stop n8n && docker rm n8n
```

Create a `docker-compose.yml` file:

```bash
nano ~/docker-compose.yml
```

```yaml
version: "3.8"

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      - ~/n8n-data:/home/node/.n8n
    environment:
      - N8N_HOST=n8n.yourdomain.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://n8n.yourdomain.com/
      - N8N_ENCRYPTION_KEY=your-random-32-char-key-here
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-secure-password-here
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=336
```

**Two important additions:**
- `N8N_BASIC_AUTH_ACTIVE=true` — enables a login screen so your instance isn't open to the world
- `EXECUTIONS_DATA_PRUNE=true` + `EXECUTIONS_DATA_MAX_AGE=336` — auto-deletes execution history older than 14 days, preventing the database from growing indefinitely

Start n8n with Compose:

```bash
docker compose up -d
```

---

## Part 6 — Verify everything is working

### Step 14 — Run through the checklist

Open `https://n8n.yourdomain.com` in your browser. You should see:
- The browser shows a padlock (HTTPS is working)
- A login screen appears (basic auth is active)
- After logging in, you see the n8n canvas

Check that webhooks work (n8n's most important production feature):

1. Create a new workflow
2. Add a Webhook trigger node
3. Copy the production webhook URL
4. It should use your domain with HTTPS — e.g. `https://n8n.yourdomain.com/webhook/your-webhook-id`

If the webhook URL shows `localhost` instead of your domain, double-check the `N8N_HOST` and `WEBHOOK_URL` environment variables in your compose file and restart the container.

### Step 15 — Test auto-restart

Reboot the server to confirm n8n comes back automatically:

```bash
sudo reboot
```

After 30 seconds, SSH back in:

```bash
ssh azureuser@YOUR_VM_IP
docker ps
```

n8n should be listed with status "Up X seconds" — it restarted automatically via Docker's `restart: unless-stopped` policy.

---

## Useful commands for ongoing maintenance

**View n8n logs:**
```bash
docker logs n8n --follow
```

**Update n8n to the latest version:**
```bash
docker compose pull
docker compose up -d
```

**Back up your n8n data:**
```bash
tar -czf n8n-backup-$(date +%Y%m%d).tar.gz ~/n8n-data
```

**Check disk usage:**
```bash
df -h
du -sh ~/n8n-data
```

**Restart n8n without downtime:**
```bash
docker compose restart n8n
```

---

## Common issues and fixes

**n8n container keeps restarting:**
Check the logs for the actual error:
```bash
docker logs n8n --tail 50
```
Usually caused by a missing or invalid `N8N_ENCRYPTION_KEY`.

**SSL certificate fails to issue:**
Make sure port 80 is open in your Azure Network Security Group and that your DNS A record is pointing at the right IP. Certbot needs to reach your server over HTTP to verify domain ownership.

**Webhook URLs show localhost instead of your domain:**
Set `WEBHOOK_URL=https://n8n.yourdomain.com/` (include the trailing slash) and `N8N_HOST=n8n.yourdomain.com` (no trailing slash, no protocol). Restart the container after changing environment variables.

**Running out of disk space:**
Enable execution pruning (`EXECUTIONS_DATA_PRUNE=true`) and run Docker's cleanup command:
```bash
docker system prune -af
```

---

## What to do next

Once n8n is running on Azure, you're ready to start building real automation workflows:

- Connect your CRM (HubSpot, Salesforce) and start automating lead follow-up
- Set up email parsing workflows to extract data from inbound messages
- Build webhook receivers for form submissions and route them to your tools
- Create scheduled data sync workflows between your platforms

If you'd rather skip the setup entirely and have a production n8n instance configured, monitored, and maintained as part of a broader automation system — that's exactly what we do at EAJJY AI. [Book a free consultation](/book) and we'll scope it out.

## FAQ

### How much does it cost to run n8n on Azure?

A Standard_B2s VM (2 vCPUs, 4 GB RAM) costs approximately $30–40 per month on Azure. For lighter workloads, a B1ms (1 vCPU, 2 GB RAM) at around $15/month is sufficient. n8n itself is free and open-source — you only pay for the Azure infrastructure.

### Can I use Azure Container Instances instead of a VM?

Yes, Azure Container Instances (ACI) can run the n8n Docker image directly without provisioning a VM. However, persistent storage is more complex to configure, and ACI doesn't support Nginx as a sidecar for SSL termination. A VM is simpler for a production n8n setup.

### How do I update n8n when a new version is released?

Pull the latest image and restart: `docker compose pull && docker compose up -d`. Your data is safe in the mounted volume — the update only replaces the application container, not the data directory.

### Is n8n on Azure suitable for production workflows?

Yes, with the configuration in this guide — persistent storage, SSL, basic auth, auto-restart, and execution pruning — n8n on Azure is production-ready. For very high-volume or mission-critical workflows, consider upgrading to a larger VM and adding a managed PostgreSQL database instead of n8n's default SQLite.

### Do I need to open any other ports on the Azure NSG?

Only ports 22 (SSH), 80 (HTTP for SSL issuance), and 443 (HTTPS). Port 5678 (n8n's internal port) should stay closed on the NSG — Nginx handles incoming traffic and forwards to n8n internally. Never expose port 5678 directly to the internet.
