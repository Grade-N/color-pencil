# color-pencil

Text coloring and styling for backend consoles/terminals

## Installation

Install this package using npm:

`npm install color-pencil`

## Usage

### Require/Import

Require or import it from the package:

```
// CommonJS (require)
const color = require('color-pencil');

// ECMAScript (import)
import color from 'color-pencil';
console.log(color.green("This is a green Text"));

```

### Use Cases

color-pencil provides convenient functions to colorize and stylize outputs in consoles/terminals:

```
// CommonJS (require)
const {green, red, white, bold, underline, strikeThrough, italic, bgYellow} = require('color-pencil');

// ECMAScript (import)
import {green, red, white, bold, underline, strikeThrough, italic, bgYellow} from 'color-pencil';

console.log("Use", red("colors"), "and", bold("styling"));
console.log(green(bold(underline("Combine"))), bold(red("and emphasize")));
console.log(white(bgYellow(strikeThrough("Yellow background and crossed out white Text"))));
```

## Functions

### Default Text/Foreground Colors
- `lightBlack`
- `black`
- `white`
- `lightBlue`
- `blue`
- `darkBlue`
- `lightRed`
- `red`
- `darkRed`
- `lightGreen`
- `green`
- `darkGreen`
- `lightOrange`
- `orange`
- `darkOrange`
- `lightYellow`
- `yellow`
- `darkYellow`
- `lightPurple`
- `purple`
- `darkPurple`
- `lightBrown`
- `brown`
- `darkBrown`
- `lightMagenta`
- `magenta`
- `darkMagenta`
- `lightCyan`
- `cyan`
- `darkCyan`
- `lightGray`
- `gray`
- `darkGray`
- `lightPink`
- `pink`
- `darkPink`

### Default Background Colors
- `bgLightBlack`
- `bgBlack`
- `bgWhite`
- `bgLightBlue`
- `bgBlue`
- `bgDarkBlue`
- `bgLightRed`
- `bgRed`
- `bgDarkRed`
- `bgLightGreen`
- `bgGreen`
- `bgDarkGreen`
- `bgLightOrange`
- `bgOrange`
- `bgDarkOrange`
- `bgLightYellow`
- `bgYellow`
- `bgDarkYellow`
- `bgLightPurple`
- `bgPurple`
- `bgDarkPurple`
- `bgLightBrown`
- `bgBrown`
- `bgDarkBrown`
- `bgLightMagenta`
- `bgMagenta`
- `bgDarkMagenta`
- `bgLightCyan`
- `bgCyan`
- `bgDarkCyan`
- `bgLightGray`
- `bgGray`
- `bgDarkGray`
- `bgLightPink`
- `bgPink`
- `bgDarkPink`

### Modifiers
- `reset` - Reset any custom stylings
- `bold` - Bold text
- `faint` - Faint text
- `italic` - Italic text
- `underline` - Underlined text
- `slowBlink` - Text blinks in a slow pace (Limited Support)
- `rapidBlink` - Text blinks in a fast pace (Limited Support)
- `reverse` - Switch colors between text(foreground) and background
- `conceal` - Print the text as hidden 
- `crossedOut` - Crossed out text
- `strikeThrough` - Crossed out text (same as `crossedOut`)

### Dynamic Colors
#### RGB
Takes input and red, green, and blue value in-between 0-255 
```
import { rgb, bgRgb } from "color-pencil"
console.log(rgb("This is a deep sky blue text", 0,191,255));
console.log(bgRgb("This is a deep sky blue background", 0,191,255));
```
#### True Colors
Sugar of the rgb function. Takes input and [r,g,b] in an array
```
import { trueColor, bgTrueColor } from "color-pencil"
console.log(trueColor("This is an indigo text", [75,0,130]));
console.log(bgTrueColor("This is an indigo background", [75,0,130]));
``` 
#### 256 Colors
256 colors supported by ANSI Escape Sequence(Link). Takes input and color index ranging in-between 0-255 

```
import { ansi256, bgAnsi256 } from "color-pencil"
console.log(ansi256("This is a cyan text", 51));
console.log(bgAnsi256("This is a cyan background", 51));
```
#### Hexadecimal Colors
Takes input and color code in hexadecimal.
```
import { hex, bgHex } from "color-pencil"
console.log(hex("This is a purple text", "#af00ff"));
console.log(hex("This is also a purple text", "af00ff"));
console.log(hex("This is a light green text", "#0FC"));
console.log(hex("This is also a light green text", "0FC"));

console.log(bgHex("This is a purple background", "#af00ff"));
console.log(bgHex("This is also a purple background", "af00ff"));
console.log(bgHex("This is a light green background", "#0FC"));
console.log(bgHex("This is also a light green background", "0FC"));
```
#### HSL
Takes input and color code in hue (0-360), saturation(0-100), and lightness(0-100). 
```
import { hsl, bgHsl } from "color-pencil"
console.log(hsl("This is a violet text",245, 46, 34 ));
console.log(bgHsl("This is a violet background",245, 46, 34 ));
```
