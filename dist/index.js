"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cnsl = void 0;
class Cnsl {
    u001b = "\u001b[";
    endEsc = "\u001b[0m";
    boldEsc = "\u001b[1m";
    reversedEsc = "\u001b[7m";
    underlineEsc = "\u001b[4m";
    foreGroundColor256 = "\u001b[38;5;";
    backGroundColor256 = "\u001b[48;5;";
    colors_arr = [
        'width|height|bottom|right', 'R',
        '{|}', 'G'
    ];
    fg = {
        Red: 91,
        Green: 92,
        Yellow: 93,
        Blue: 94,
        Magenta: 95,
        Cyan: 96,
        White: 97,
    };
    bg = {
        Red: 101,
        Green: 102,
        Yellow: 103,
        Blue: 104,
        Magenta: 105,
        Cyan: 106,
        White: 107
    };
    atr = {
        bold: 1,
        underline: 4,
        blinked: 5,
        inverse: 7,
        hidden: 8
    };
    colorSchema = {
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
    ESC = '\u001b[';
    m = 'm';
    reset = 0;
    open = this.ESC;
    close;
    comma = ";";
    ifBright(b, color) {
        if (b)
            color -= 60;
        return color;
    }
    log_raw(...args) {
        console.log(args);
    }
    ;
    fillColors(v) {
        for (let key in v) {
            let s = key[0].toUpperCase();
            v[s] = v[key];
            v[key.toUpperCase()] = v[key];
        }
    }
    fillAttrs(v) {
        for (let key in v) {
            let s0 = key[0].toUpperCase();
            let s1 = key[1].toUpperCase();
            v[s0 + s1] = v[key];
            v[key.toUpperCase()] = v[key];
        }
    }
    exx(fn, data, flags, b) {
        if (!data)
            data = "";
        if (flags != undefined) {
        }
        else {
            process.exit();
        }
    }
    ;
    d2 = (num = 1) => {
        return this.open + (num || '') + 'A';
    };
    d8 = (num = 1) => {
        return this.open + (num || '') + 'B';
    };
    d6 = (num = 1) => {
        return this.open + (num || '') + 'C';
    };
    d4 = (num = 1) => {
        return this.open + (num || '') + 'D';
    };
    nextLine = (num = 1) => {
        return this.open + (num || '') + 'E';
    };
    previousLine = (num = 1) => {
        return this.open + (num || '') + 'F';
    };
    horizontalAbsolute = (num = 1) => {
        if (num == null)
            throw new Error('horizontalAboslute requires a column to position to');
        return this.open + num + 'G';
    };
    eraseData = () => {
        return this.open + 'J';
    };
    eraseLine = () => {
        return {};
    };
    goto = (x, y) => {
        return this.open + y + ';' + x + 'H';
    };
    gotoSOL = () => {
        return '\r';
    };
    beep = () => {
        return '\x07';
    };
    hideCursor = () => {
        return this.open + '?25l';
    };
    showCursor = () => {
        return this.open + '?25h';
    };
    cursor = (x, y) => {
        process.stdout.write(this.goto(x, y));
    };
    colorNodeRenderer = (fg) => {
        const s = {
            pre: 0,
            head: fg.Yellow,
            in: fg.Magenta,
            body: fg.Green,
            out: fg.Cyan,
            tail: fg.Red,
            post: fg.Blue,
        };
        return s;
    };
    msg = (fn, arr, colors) => {
        let bgNotBright;
        let fgNotBright;
        let sbg;
        let fg;
        let bg;
        let s = "";
        let token_arr;
        let colors_arr;
        let attrs_arr;
        let pair_arr;
        let pairBright_arr;
        let k;
        if (colors) {
            colors_arr = colors.split(" ");
        }
        if (fn)
            s = this.ESC + this.fg.R + this.m + fn;
        if (arr.length > 0)
            arr.forEach((item, index, arr) => {
                if (colors)
                    k = colors_arr[index];
                if (k) {
                    token_arr = k.split('/');
                    if (token_arr.length > 1)
                        attrs_arr = token_arr[1].split(";");
                    else
                        attrs_arr = [];
                    pair_arr = token_arr[0].split("_");
                    fg = pair_arr[pair_arr.length - 1].toUpperCase();
                    (pair_arr.length > 1) ? bg = pair_arr[0] : bg = undefined;
                    if (bg) {
                        bg = bg.toUpperCase();
                        pairBright_arr = bg.split("-");
                        bg = pairBright_arr[pairBright_arr.length - 1];
                        bgNotBright = (pairBright_arr.length > 1);
                    }
                    pairBright_arr = fg.split("-");
                    fg = pairBright_arr[pairBright_arr.length - 1];
                    fgNotBright = (pairBright_arr.length > 1);
                    (!bg) ? sbg = "" : sbg = ";" + this.ifBright(bgNotBright, this.bg[bg]);
                    s += this.ESC + this.ifBright(fgNotBright, this.fg[fg]) + sbg;
                    attrs_arr.forEach((atr, index, arr) => {
                        s += this.comma + this.atr[atr];
                    });
                    s += this.m;
                    s += item;
                    s += this.close;
                }
                else
                    s += item;
            });
        return s;
    };
    log = (colors, ...args) => {
        let s = this.msg("", args, colors);
        console.log(s);
    };
    lof = (f, colors, ...args) => {
        let s = this.msg(f, args, colors);
        console.log(s);
    };
    loc = (f, x, y, colors, ...args) => {
        let s = this.msg(f, args, colors);
        this.cursor(x, y);
        console.log(s);
    };
    ao = (arr, value) => {
        let obj = {};
        let s;
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
        Object.assign(this.colorSchema.default.hook = {}, this.colorNodeRenderer(this.fg));
    }
}
exports.Cnsl = Cnsl;
//# sourceMappingURL=index.js.map