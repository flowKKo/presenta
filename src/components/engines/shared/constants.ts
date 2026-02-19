/** Standard SVG viewBox dimensions shared by all SVG-based engines */
export const VB_W = 800
export const VB_H = 480

/** Truncate label text, adding ellipsis if it exceeds maxChars */
export function truncateLabel(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text
}
