/**
 * Copy text to the clipboard with a legacy fallback.
 *
 * `navigator.clipboard` only exists in a secure context (HTTPS or localhost),
 * so on a plain `http://` origin it is `undefined` and the call throws. The
 * fallback below uses a hidden textarea + `document.execCommand("copy")`,
 * which still works on insecure origins and older browsers.
 *
 * @returns whether the text was actually copied.
 */
export async function copyText(value: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Permission denied / document not focused / no secure context — fall through.
    }
  }

  if (typeof document === "undefined") return false;

  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.width = "1px";
    textarea.style.height = "1px";
    textarea.style.padding = "0";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.boxShadow = "none";
    textarea.style.background = "transparent";
    textarea.style.opacity = "0";
    textarea.setAttribute("aria-hidden", "true");
    textarea.setAttribute("tabindex", "-1");

    document.body.appendChild(textarea);

    const selection = document.getSelection();
    const previousRange =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (selection) {
      selection.removeAllRanges();
      if (previousRange) selection.addRange(previousRange);
    }

    return ok;
  } catch {
    return false;
  }
}

/** Select an element's text so the user can copy it manually with ⌘C / Ctrl+C. */
export function selectElementText(element: HTMLElement | null) {
  if (!element || typeof window === "undefined") return;
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}
