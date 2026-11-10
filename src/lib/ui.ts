// Decisiones de interfaz como funciones puras (sin DOM), para poder testearlas con Node
// (tests/unit/ui.test.ts). Los componentes les pasan los datos que leen del DOM.

export interface AnimationLike {
  animationName?: string;
  playState: string;
  currentTime: number | null;
}

/**
 * ¿El respaldo CSS `reveal-fallback` ya mostró el elemento? Sí si terminó o si ya pasó
 * su retraso (`delayMs`, 2 s en Layout.astro).
 */
export function fallbackAlreadyShown(animations: AnimationLike[], delayMs = 2000): boolean {
  return animations.some((a) => {
    if (a.animationName !== "reveal-fallback") return false;
    if (a.playState === "finished") return true;
    return a.currentTime !== null && a.currentTime >= delayMs;
  });
}

/**
 * ¿Se cierra el menú del CV en `focusout`?
 * `relatedInside`: si el foco va a un elemento dentro del menú (`null` si no va a ninguno).
 * `hovered`: si el puntero está sobre el menú. Sólo importa cuando `relatedInside` es null:
 * Safari no enfoca enlaces al hacer clic y deja relatedTarget en null.
 */
export function shouldCloseCvMenu(relatedInside: boolean | null, hovered: boolean): boolean {
  if (relatedInside === true) return false;
  if (relatedInside === null && hovered) return false;
  return true;
}

/** Índice siguiente de la galería, con vuelta al principio/final. Con 0 o 1 imagen, 0. */
export function galleryStep(current: number, delta: number, total: number): number {
  if (total <= 1) return 0;
  return (((current + delta) % total) + total) % total;
}
