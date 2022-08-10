"use strict"
import { TColors, TFlags, TLogs, TColorSchema, TNumber } from './index.d'

export class Cnsl {
  u001b = "\u001b[";
  endEsc = "\u001b[0m";
  boldEsc = "\u001b[1m";
  reversedEsc = "\u001b[7m";
  underlineEsc = "\u001b[4m";
  foreGroundColor256 = "\u001b[38;5;"
  backGroundColor256 = "\u001b[48;5;"
  colors_arr: string[] = [
    'width|height|bottom|right', 'R',
    '{|}', 'G'
  ];
  fg: TColors = {
    Red: 91,
    Green: 92,
    Yellow: 93,
    Blue: 94,
    Magenta: 95,
    Cyan: 96,
    White: 97,
  };
  bg: TColors = {
    Red: 101,
    Green: 102,
    Yellow: 103,
    Blue: 104,
    Magenta: 105,
    Cyan: 106,
    White: 107
  };
  atr: TColors = {
    bold: 1,
    underline: 4,
    blinked: 5,
    inverse: 7,
    hidden: 8
  };
  colorSchema: TColorSchema = {

    default: {
      msg: "G",
      ctx: "W",
      ":": "W",
      attr: {
        name: "C",
        value: "Y"
      },
      pair: {
        arr: "W",
      }

    }
  };
  ESC: string = '\u001b[';
  m: string = 'm';
  reset: number = 0;

  open: string = this.ESC;
  close: string;

  comma: string = ";";
  ifBright(b: boolean, color: number): number {
    if (b) color -= 60;
    return color;
  }

  log_raw(...args: any[]) {
    console.log(args);
  };
  fillColors(v: TColors) {
    for (let key in v) {
      let s = key[0].toUpperCase();
      v[s] = v[key];
      v[key.toUpperCase()] = v[key];
    }
    //console.log(v);

  }
  fillAttrs(v: TColors) {
    for (let key in v) {
      let s0 = key[0].toUpperCase();
      let s1 = key[1].toUpperCase();
      v[s0 + s1] = v[key];
      v[key.toUpperCase()] = v[key];
    }
    //console.log(v);

  }
  exx(fn: string, data: string, flags: TFlags, b: boolean) {
    //return;
    //let f = TTNI.f();
    //console.log('fn= ', fn);

    if (!data) data = "";
    if (flags != undefined) {
      //  console.log(fn, 'flags=', flags, 'data=',data,pals,f);
      /*if (getVtest(flags, data, fn, b)) {
        if (shv.G != undefined) console.log(msg(shv.G('\nexit'), ['happened in:', fn, ' по флагу:', data], "CMGY"));
        else console.log("\nexit happened in:'" + fn + "'", ' по флагу:', data);
        process.exit();
      }*/
    } else {
      /*if (global.shv) {
        if (shv.G != undefined) console.log(shv.G('\nexit'), shv.C('happened in:'), shv.M(fn), data);
        else console.log("\nexit happened in:'" + fn + "'", data);
      }*/
      process.exit();
    }
  };

  d2 = (num: number = 1): string => {
    return this.open + (num || '') + 'A'
  };

  d8 = (num: number = 1): string => {
    return this.open + (num || '') + 'B'
  };

  d6 = (num: number = 1): string => {
    return this.open + (num || '') + 'C'
  };

  d4 = (num: number = 1): string => {
    return this.open + (num || '') + 'D'
  };

  nextLine = (num: number = 1): string => {
    return this.open + (num || '') + 'E'
  };

  previousLine = (num: number = 1): string => {
    return this.open + (num || '') + 'F'
  };

  horizontalAbsolute = (num: number = 1): string => {
    if (num == null) throw new Error('horizontalAboslute requires a column to position to')
    return this.open + num + 'G'
  };

  eraseData = (): string => {
    return this.open + 'J'
  };

  eraseLine = (): TColors => {
    return {

    }
  };

  goto = (x: number, y: number): string => {
    return this.open + y + ';' + x + 'H';
  };

  gotoSOL = (): string => {
    return '\r'
  };

  beep = (): string => {
    return '\x07'
  };

  hideCursor = (): string => {
    return this.open + '?25l'
  };

  showCursor = (): string => {
    return this.open + '?25h'
  };


  cursor = (x: number, y: number) => {
    process.stdout.write(this.goto(x, y));
  }
  colorNodeRenderer = (fg: TColors): TColors => {
    const s: TColors = {
      pre: 0,
      head: fg.Yellow,
      in: fg.Magenta,
      body: fg.Green,
      out: fg.Cyan,
      tail: fg.Red,
      post: fg.Blue,
    }
    return s
  }
  msg = (fn: string, arr: string[], colors: string | undefined): string => {
    let bgNotBright: boolean;
    let fgNotBright: boolean;
    let sbg: string | number;
    let fg: string;
    let bg: string | undefined;
    let s: string = "";
    let token_arr: string[];
    let colors_arr: string[];
    let attrs_arr: string[];
    let pair_arr: string[];
    let pairBright_arr: string[];
    let k: string;
    if (colors) {
      colors_arr = colors.split(" ");
      //console.log(colors_arr)
    }

    if (fn) s = this.ESC + this.fg.R + this.m + fn;
    if (arr.length > 0)
      arr.forEach((item, index, arr) => {

        if (colors) k = colors_arr[index];

        if (k) {
          token_arr = k.split('/');
          if (token_arr.length > 1) attrs_arr = token_arr[1].split(";");
          else attrs_arr = [];
          pair_arr = token_arr[0].split("_");
          fg = pair_arr[pair_arr.length - 1].toUpperCase();
          (pair_arr.length > 1) ? bg = pair_arr[0]: bg = undefined;
          //console.log(pair_arr);
          if (bg) {
            bg = bg.toUpperCase();
            pairBright_arr = bg.split("-");
            bg = pairBright_arr[pairBright_arr.length - 1]
            bgNotBright = (pairBright_arr.length > 1);

            //console.log('pairBright_arr=', bg, bgNotBright);
          }
          pairBright_arr = fg.split("-");
          fg = pairBright_arr[pairBright_arr.length - 1]
          fgNotBright = (pairBright_arr.length > 1);

          //console.log('pairBright_arr=', fg, fgNotBright);
          (!bg) ? sbg = "": sbg = ";" + this.ifBright(bgNotBright, this.bg[bg]);
          s += this.ESC + this.ifBright(fgNotBright, this.fg[fg]) + sbg;
          attrs_arr.forEach((atr, index, arr) => {
            //console.log(`'${atr}'`,this.atr[atr])
            s += this.comma + this.atr[atr];

          })
          s += this.m;
          s += item;
          s += this.close;

        } else s += item;
      });

    return s;
  }
  log = (colors: string, ...args: any[]) => {
    let s: string = this.msg("", args, colors);
    console.log(s);
  };
  lof = (f: string, colors: string, ...args: any[]) => {
    let s: string = this.msg(f, args, colors);
    console.log(s);
  };
  loc = (f: string, x: number, y: number, colors: string, ...args: any[]) => {
    let s: string = this.msg(f, args, colors);
    this.cursor(x, y);
    console.log(s);
  };
  ao = (arr: string[], value ? : number): TNumber => {
    let obj: TNumber = {};
    let s: number;
    //console.log('arr=',arr);

    arr.forEach((item, index, arr) => {
      obj[item] = index;
    });
    return obj;
  };

  constructor() {
    this.close = this.ESC + this.reset + this.m;
    this.fillColors(this.fg);
    this.fillColors(this.bg);
    this.fillAttrs(this.atr);
    Object.assign(this.colorSchema.default.hook = {}, this.colorNodeRenderer(this.fg))
    //console.log('this.colorSchema.default.hook=', this.colorSchema.default.hook);
  }
}