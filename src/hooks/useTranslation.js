import { useLocation } from "react-router-dom";
import en from "../i18n/en.json";
import de from "../i18n/de.json";

/**
 * useTranslation()
 *
 * Returns the translation object for the current language.
 * If the URL starts with /de/, returns German (de.json).
 * Otherwise returns English (en.json).
 *
 * Usage:
 *   const t = useTranslation();
 *   <h1>{t.hero.headline}</h1>
 */
export default function useTranslation() {
  const { pathname } = useLocation();
  return pathname.startsWith("/de") ? de : en;
}

export { en, de };
