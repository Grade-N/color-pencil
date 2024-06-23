export class OutputManager {
  static #colorMode256 = "5;";
  static #colorModeRgb = "2;";
  static #undefined = undefined;
  static #undefinedString = "undefined";
  static #null = null;
  static #nullString = "null";
  static #reset = "\x1b[0m";
  static #resetRegexp = /\x1b\[0m/g;
  static #prefix = "\x1b[";
  static #bg = "48;";
  static #fg = "38;";
  static #isServerSide= (typeof process !== 'undefined' && process.stdout.isTTY); 

  static #scrub(input: string) {
    let count = 0;
    return input.replace(OutputManager.#resetRegexp, (match, offset, string) => {
      count++;
      // Only replace if it's not the last occurrence
      if (count < string.match(OutputManager.#resetRegexp).length) {
        return '';
      }
      return match;
    });
  }

  static getDefaultOutput(input: any, colorIndex: number, isBg: boolean = false) {
    if(!OutputManager.#isServerSide){
      return input;
    }
    try {
      if (typeof colorIndex !== `number` || colorIndex < 0 || colorIndex > 255) {
        colorIndex = 0;
      }

      if (input === OutputManager.#undefined) {
        input = OutputManager.#undefinedString;
      } else if (input === OutputManager.#null) {
        input = OutputManager.#nullString;
      } else if (typeof input !== "string") {
        input = JSON.stringify(input);
      }
      /* const x= OutputManager.#scrub(OutputManager.#prefix + (isBg ? OutputManager.#bg : OutputManager.#fg) + OutputManager.#colorMode256 + colorIndex + "m" + input + OutputManager.#reset);
      console.log(x); */
      return OutputManager.#prefix + (isBg ? OutputManager.#bg : OutputManager.#fg) + OutputManager.#colorMode256 + colorIndex + "m" + input + OutputManager.#reset;
    } catch (err: any) {
      //console.log(err.toString())
      return input;
    }
  }

  static getRgbOutput(input: any, r: number, g: number, b: number, isBg: boolean = false) {
    if(!OutputManager.#isServerSide){
      return input;
    }
    if (typeof r !== `number` || typeof g !== `number` || typeof b !== `number` || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      if (isBg) {
        r = g = b = 255;
      } else {
        r = g = b = 0;
      }
    }
    try {
      if (input === OutputManager.#undefined) {
        input = OutputManager.#undefinedString;
      } else if (input === OutputManager.#null) {
        input = OutputManager.#nullString;
      } else if (typeof input !== "string") {
        input = JSON.stringify(input);
      }
      return OutputManager.#prefix + (isBg ? OutputManager.#bg : OutputManager.#fg) + OutputManager.#colorModeRgb + r + ";" + g + ";" + b + "m" + input + OutputManager.#reset;
    } catch (err: any) {
      return input;
    }
  }

  static getHexOutput(input: any, hex: string, isBg: boolean = false) {
    if(!OutputManager.#isServerSide){
      return input;
    }
    if (hex.charAt(0) !== `#`) {
      hex = `#${hex}`;
    }
    const validHexRegex = /^#?[0-9A-Fa-f]{3}(?:[0-9A-Fa-f]{3})?$/;
    if (!validHexRegex.test(hex)) {
      hex = isBg ? `#FFFFFF` : `#000000`;
    } else {
      if (hex.substring(1).length == 3) {
        hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
      }
    }
    let rHex = hex.substring(1, 3);
    let gHex = hex.substring(3, 5);
    let bHex = hex.substring(5, 7);

    let r = parseInt(rHex, 16);
    let g = parseInt(gHex, 16);
    let b = parseInt(bHex, 16);

    try {
      if (input === OutputManager.#undefined) {
        input = OutputManager.#undefinedString;
      } else if (input === OutputManager.#null) {
        input = OutputManager.#nullString;
      } else if (typeof input !== "string") {
        input = JSON.stringify(input);
      }
      return OutputManager.#prefix + (isBg ? OutputManager.#bg : OutputManager.#fg) + OutputManager.#colorModeRgb + r + ";" + g + ";" + b + "m" + input + OutputManager.#reset;
    } catch (err: any) {
      return input;
    }
  }

  static #hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  
  static #hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // Achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = OutputManager.#hue2rgb(p, q, h + 1 / 3);
      g = OutputManager.#hue2rgb(p, q, h);
      b = OutputManager.#hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  static getHslOutput(input: any, hue: number, saturation: number, lightness: number, isBg: boolean = false) {
    if(!OutputManager.#isServerSide){
      return input;
    }
    if (typeof hue !== `number` || typeof saturation !== `number` || typeof lightness !== `number` || !Number.isInteger(hue) || !Number.isInteger(saturation) || !Number.isInteger(lightness) || hue < 0 || hue > 360 || saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100) {
      if (isBg) {
        hue = 0;
        saturation = 0;
        lightness = 100;
      } else {
        hue = saturation = lightness = 0;
      }
    }
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    const [r, g, b] = OutputManager.#hslToRgb(hue, saturation, lightness);
    try {
      if (input === OutputManager.#undefined) {
        input = OutputManager.#undefinedString;
      } else if (input === OutputManager.#null) {
        input = OutputManager.#nullString;
      } else if (typeof input !== "string") {
        input = JSON.stringify(input);
      }
      return OutputManager.#prefix + (isBg ? OutputManager.#bg : OutputManager.#fg) + OutputManager.#colorModeRgb + r + ";" + g + ";" + b + "m" + input + OutputManager.#reset;
    } catch (err: any) {
      return input;
    }
  }

  static getStyleOutput(input: any, index: number) {
    if(!OutputManager.#isServerSide){
      return input;
    }
    if (typeof index !== `number` || !Number.isInteger(index) || index < 0 || index > 9) {
      index = 0;
    }
    try {
      if (input === OutputManager.#undefined) {
        input = OutputManager.#undefinedString;
      } else if (input === OutputManager.#null) {
        input = OutputManager.#nullString;
      } else if (typeof input !== "string") {
        input = JSON.stringify(input);
      }
      return OutputManager.#prefix + index + "m" + input + OutputManager.#reset;
    } catch (err: any) {
      return input;
    }
  }
}