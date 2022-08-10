export declare type TColorSchema = {
  default: {
    msg: string;
    ctx: string;
    ":": string;
    attr: {
      name: string;
      value: string;
    };
    pair: {
      arr: string;
    };
    hook ? : TColors;
  };
};
export declare type TNumber = {
  [key: string]: number;
};
export declare type TNames = {
  [key: string]: string;
};
export declare type TFlags = TNumber;
export declare type TLogs = TNumber;
export declare type TColors = TNumber;
export declare class ConsCtl {
  u001b: string;
  endEsc: string;
  boldEsc: string;
  reversedEsc: string;
  underlineEsc: string;
  foreGroundColor256: string;
  backGroundColor256: string;
  fg: TColors;
  bg: TColors;
  log: TColors;
  open: string;
  exx(fn: string, data: string, flags: TFlags, b: boolean): void;
  d2(num ? : number): string;
  d8(num ? : number): string;
  d6(num ? : number): string;
  d4(num ? : number): string;
  nextLine(num ? : number): string;
  previousLine(num ? : number): string;
  horizontalAbsolute(num ? : number): string;
  eraseData(): string;
  eraseLine(): TColors;
  goto(x: number, y: number): string;
  gotoSOL(): string;
  beep(): string;
  hideCursor(): string;
  showCursor(): string;
  cursor: (x: number, y: number) => void;
  colorSchema: TColorSchema;
  colorNodeRenderer(fg: TColors): TColors;
  ao(arr: string[], value ? : number): TNumber;
  colors_arr: any;
  constructor();
}