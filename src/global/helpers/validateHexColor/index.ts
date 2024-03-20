export const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

export function validateHexColor(hex: string) {
  return hexRegex.test(hex);
}
