"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cnsl = void 0;
var Cnsl = (function () {
    function Cnsl() {
        var _this = this;
        this.u001b = "\u001b[";
        this.endEsc = "\u001b[0m";
        this.boldEsc = "\u001b[1m";
        this.reversedEsc = "\u001b[7m";
        this.underlineEsc = "\u001b[4m";
        this.foreGroundColor256 = "\u001b[38;5;";
        this.backGroundColor256 = "\u001b[48;5;";
        this.colors_arr = [
            'width|height|bottom|right', 'R',
            '{|}', 'G'
        ];
        this.fg = {
            Red: 91,
            Green: 92,
            Yellow: 93,
            Blue: 94,
            Magenta: 95,
            Cyan: 96,
            White: 97,
        };
        this.bg = {
            Red: 101,
            Green: 102,
            Yellow: 103,
            Blue: 104,
            Magenta: 105,
            Cyan: 106,
            White: 107
        };
        this.atr = {
            bold: 1,
            underline: 4,
            blinked: 5,
            inverse: 7,
            hidden: 8
        };
        this.colorSchema = {
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
        this.ESC = '\u001b[';
        this.m = 'm';
        this.reset = 0;
        this.open = this.ESC;
        this.comma = ";";
        this.d2 = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'A';
        };
        this.d8 = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'B';
        };
        this.d6 = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'C';
        };
        this.d4 = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'D';
        };
        this.nextLine = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'E';
        };
        this.previousLine = function (num) {
            if (num === void 0) { num = 1; }
            return _this.open + (num || '') + 'F';
        };
        this.horizontalAbsolute = function (num) {
            if (num === void 0) { num = 1; }
            if (num == null)
                throw new Error('horizontalAboslute requires a column to position to');
            return _this.open + num + 'G';
        };
        this.eraseData = function () {
            return _this.open + 'J';
        };
        this.eraseLine = function () {
            return {};
        };
        this.goto = function (x, y) {
            return _this.open + y + ';' + x + 'H';
        };
        this.gotoSOL = function () {
            return '\r';
        };
        this.beep = function () {
            return '\x07';
        };
        this.hideCursor = function () {
            return _this.open + '?25l';
        };
        this.showCursor = function () {
            return _this.open + '?25h';
        };
        this.cursor = function (x, y) {
            process.stdout.write(_this.goto(x, y));
        };
        this.colorNodeRenderer = function (fg) {
            var s = {
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
        this.msg = function (fn, arr, colors) {
            var bgNotBright;
            var fgNotBright;
            var sbg;
            var fg;
            var bg;
            var s = "";
            var token_arr;
            var colors_arr;
            var attrs_arr;
            var pair_arr;
            var pairBright_arr;
            var k;
            if (colors) {
                colors_arr = colors.split(" ");
            }
            if (fn)
                s = _this.ESC + _this.fg.R + _this.m + fn;
            if (arr.length > 0)
                arr.forEach(function (item, index, arr) {
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
                        (!bg) ? sbg = "" : sbg = ";" + _this.ifBright(bgNotBright, _this.bg[bg]);
                        s += _this.ESC + _this.ifBright(fgNotBright, _this.fg[fg]) + sbg;
                        attrs_arr.forEach(function (atr, index, arr) {
                            s += _this.comma + _this.atr[atr];
                        });
                        s += _this.m;
                        s += item;
                        s += _this.close;
                    }
                    else
                        s += item;
                });
            return s;
        };
        this.log = function (colors) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var s = _this.msg("", args, colors);
            console.log(s);
        };
        this.lof = function (f, colors) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var s = _this.msg(f, args, colors);
            console.log(s);
        };
        this.loc = function (f, x, y, colors) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var s = _this.msg(f, args, colors);
            _this.cursor(x, y);
            console.log(s);
        };
        this.ao = function (arr, value) {
            var obj = {};
            var s;
            arr.forEach(function (item, index, arr) {
                obj[item] = index;
            });
            return obj;
        };
        this.close = this.ESC + this.reset + this.m;
        this.fillColors(this.fg);
        this.fillColors(this.bg);
        this.fillAttrs(this.atr);
        Object.assign(this.colorSchema.default.hook = {}, this.colorNodeRenderer(this.fg));
    }
    Cnsl.prototype.ifBright = function (b, color) {
        if (b)
            color -= 60;
        return color;
    };
    Cnsl.prototype.log_raw = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    ;
    Cnsl.prototype.fillColors = function (v) {
        for (var key in v) {
            var s = key[0].toUpperCase();
            v[s] = v[key];
            v[key.toUpperCase()] = v[key];
        }
    };
    Cnsl.prototype.fillAttrs = function (v) {
        for (var key in v) {
            var s0 = key[0].toUpperCase();
            var s1 = key[1].toUpperCase();
            v[s0 + s1] = v[key];
            v[key.toUpperCase()] = v[key];
        }
    };
    Cnsl.prototype.exx = function (fn, data, flags, b) {
        if (!data)
            data = "";
        if (flags != undefined) {
        }
        else {
            process.exit();
        }
    };
    ;
    return Cnsl;
}());
exports.Cnsl = Cnsl;
