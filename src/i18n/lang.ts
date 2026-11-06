// Lógica de idioma sin `window`, para poder testearla con Node (tests/unit/lang.test.ts).

export type Lang = "es" | "en";

const isLang = (v: string | null | undefined): v is Lang => v === "es" || v === "en";

/** Idioma activo: ?lang válido en la URL > valor guardado válido > "es". */
export function resolveLang(search: string, stored: string | null): Lang {
  const fromUrl = new URLSearchParams(search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  if (isLang(stored)) return stored;
  return "es";
}

/**
 * Si la URL ya trae ?lang, la devuelve con el idioma nuevo (conserva el resto de
 * parámetros y el hash). Si no lo trae, devuelve null: no hace falta tocar la URL.
 */
export function withLangParam(href: string, lang: Lang): string | null {
  const url = new URL(href);
  const re = /([?&])lang=[^&#]*/;
  if (!re.test(url.search)) return null;
  // Se reemplaza sólo el valor de `lang` en la query cruda: el resto de parámetros
  // conserva su codificación original (URLSearchParams la reescribiría).
  url.search = url.search.replace(re, `$1lang=${lang}`);
  return url.toString();
}
