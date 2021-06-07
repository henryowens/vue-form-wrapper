export interface FormField {
  ref: string;
  value: unknown;
}

export type FormFields = FormField[];

export enum HTMLInputTagName {
  INPUT = "INPUT",
  SELECT = "SELECT",
  TEXTAREA = "TEXTAREA",
}

interface Button {
  ref: string;
}

export type Buttons = Button[];

export interface FormButtonPayload {
  ref: string;
  formFeilds: FormFields;
}
