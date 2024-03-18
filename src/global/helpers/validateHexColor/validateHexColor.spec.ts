import { validateHexColor } from ".";

describe('ValidateHexColor function', () => {

  it('Should check a three-character color', () => {
    const isValid = validateHexColor('#fff');
    expect(isValid).toBeTruthy()
  });

  it('Should check a six-character color', () => {
    const isValid = validateHexColor('#ffffff');
    expect(isValid).toBeTruthy()
  });

  it('Should check a six-character color with distinct values', () => {
    const isValid = validateHexColor('#fae2d3');
    expect(isValid).toBeTruthy()
  });

  it('Should check a four-character color (invalid)', () => {
    const isValid = validateHexColor('#f1ee');
    expect(isValid).toBeFalsy()
  });

  it('Should check an invalid color with digit out of hexadecimal range', () => {
    const isValid = validateHexColor('#fzz');
    expect(isValid).toBeFalsy()
  });

  it('Should check an invalid color with more than 6 characters', () => {
    const isValid = validateHexColor('#fffaaab');
    expect(isValid).toBeFalsy()
  });
});