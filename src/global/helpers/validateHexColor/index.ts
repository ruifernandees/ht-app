export function validateHexColor(hex: string) {
  const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  if (hexRegex.test(hex)) {
    console.log(hex + ' is a valid hexadecimal color code.');
    return true;
  } else {
    console.log(hex + ' is NOT a valid hexadecimal color code.');
    return false;
  }
}
