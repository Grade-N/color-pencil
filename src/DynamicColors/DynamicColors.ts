import { OutputManager } from "../OutputManager.js";
const M = OutputManager;
export class DynamicColors {
  static rgb(input: any, r: number, g: number, b: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getRgbOutput(input, r, g, b, false);
  }
  static trueColor(input: any, rgb: number[]) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getRgbOutput(input, rgb[0], rgb[1], rgb[2], false);
  }
  static ansi256(input: any, index: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getDefaultOutput(input, index, false);
  }
  static hex(input: any, hex: string) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getHexOutput(input, hex, false);
  }
  static hsl(input: any, hue: number, saturation: number, lightness: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getHslOutput(input, hue, saturation, lightness, false);
  }
  static bgRgb(input: any, r: number, g: number, b: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getRgbOutput(input, r, g, b, true);
  }
  static bgTrueColor(input: any, rgb: number[]) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getRgbOutput(input, rgb[0], rgb[1], rgb[2], true);
  }
  static bgAnsi256(input: any, index: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getDefaultOutput(input, index, true);
  }
  static bgHex(input: any, hex: string) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getHexOutput(input, hex, true);
  }
  static bgHsl(input: any, hue: number, saturation: number, lightness: number) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getHslOutput(input, hue, saturation, lightness, true);
  }
}
const D = DynamicColors;
export const rgb = D.rgb;
export const trueColor = D.trueColor;
export const ansi256 = D.ansi256;
export const hex = D.hex;
export const hsl = D.hsl;
export const bgRgb = D.bgRgb;
export const bgTrueColor = D.bgTrueColor;
export const bgAnsi256 = D.bgAnsi256;
export const bgHex = D.bgHex;
export const bgHsl = D.bgHsl;