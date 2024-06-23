import { OutputManager } from "../OutputManager.js";
const M = OutputManager;
export class Modifiers {
  static reset(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 0);
  }
  static bold(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 1);
  }
  static faint(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 2);
  }
  static italic(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 3);
  }
  static underline(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 4);
  }
  static slowBlink(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 5);
  }
  static rapidBlink(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 6);
  }
  static reverse(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 7);
  }
  static conceal(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 8);
  }
  static crossedOut(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 9);
  }
  static strikeThrough(input: any) {
    if (arguments.length === 0) {
      input = "";
    }
    return M.getStyleOutput(input, 9);
  }
}
const S = Modifiers;
export const reset = S.reset;
export const bold = S.bold;
export const faint = S.faint;
export const italic = S.italic;
export const underline = S.underline;
export const slowBlink = S.slowBlink;
export const rapidBlink = S.rapidBlink;
export const reverse = S.reverse;
export const conceal = S.conceal;
export const crossedOut = S.crossedOut;
export const strikeThrough = S.strikeThrough;