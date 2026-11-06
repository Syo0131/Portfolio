import { translations, type TranslationKey } from "./translations";
import { resolveLang, withLangParam, type Lang } from "./lang";

export type { Lang };

export function getLang(): Lang {
  if (typeof window === "undefined") return "es";
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("lang");
  } catch {
    // almacenamiento bloqueado: se usa la URL o el idioma por defecto
  }
  return resolveLang(window.location.search, stored);
}

export function t(key: TranslationKey, lang?: Lang): string {
  const currentLang = lang || getLang();
  const dict = translations[currentLang] as Record<string, string>;
  return dict?.[key] ?? key;
}

export function setLang(lang: Lang): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  // Si la URL trae ?lang (p. ej. un enlace hreflang), se actualiza para que no
  // vuelva a imponer el idioma anterior en el siguiente cambio o al recargar.
  const nextUrl = withLangParam(window.location.href, lang);
  if (nextUrl && nextUrl !== window.location.href) {
    history.replaceState(history.state, "", nextUrl);
  }

  document.querySelectorAll(".lang-text").forEach((el) => {
    el.textContent = lang.toUpperCase();
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      const val = t(key as TranslationKey, lang);
      if (val) el.textContent = val;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (
      key &&
      (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)
    ) {
      const val = t(key as TranslationKey, lang);
      if (val) el.placeholder = val;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key) {
      const val = t(key as TranslationKey, lang);
      if (val) el.setAttribute("aria-label", val);
    }
  });

  document.dispatchEvent(
    new CustomEvent("langchange", { detail: { lang } })
  );
}

export function onLangChange(cb: (lang: Lang) => void): void {
  if (typeof document === "undefined") return;
  document.addEventListener("langchange", ((e: CustomEvent<{ lang: Lang }>) => {
    cb(e.detail.lang);
  }) as EventListener);
}
