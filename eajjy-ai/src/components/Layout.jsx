import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Background from "./Background.jsx";
import CustomCursor from "./CustomCursor.jsx";
import Navbar from "./Navbar.jsx";
import MobileMenu from "./MobileMenu.jsx";
import Footer from "./Footer.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useScrollReveal(location.pathname);

  // scroll to top + close menu on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  // lock body scroll + escape key
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const esc = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menuOpen]);

  return (
    <>
      <Background />
      <CustomCursor />
      <Navbar onMenu={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
