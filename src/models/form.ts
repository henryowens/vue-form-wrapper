export interface FormItem {
  ref: string;
  value: unknown;
}

export type FormItems = FormItem[];

export enum HTMLInputTagName {
  INPUT = "INPUT",
  SELECT = "SELECT",
  TEXTAREA = "TEXTAREA",
}
