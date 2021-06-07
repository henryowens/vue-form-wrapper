// packages
import { reactive } from "@vue/reactivity";

// models
import { FormField, FormFields, HTMLInputTagName } from "@/models/form";
import { Refs } from "@/models/refs";

interface Button {
  ref: string;
}

type Buttons = Button[];

interface State {
  formFields: FormFields;
  buttons: Buttons;
}

export interface IForm {
  state: State;
  init: (vueCntxt: any) => void;
}

export function useForms(): IForm {
  let vueContext: any = {};

  const state: State = reactive({
    formFields: [],
    buttons: [],
  });

  function init(vueCntxt: any): void {
    vueContext = vueCntxt;
    updateFormItems();
    addingListeners();
  }

  function isInputFields(el: HTMLElement) {
    if (
      Object.values(HTMLInputTagName).includes(el.tagName as HTMLInputTagName)
    )
      return true;
    return false;
  }

  function update(ref: string, value: unknown) {
    const index = state.formFields.findIndex(
      (formField: FormField) => formField.ref === ref
    );
    if (index !== -1) {
      if (state.formFields[index].value !== value)
        state.formFields[index].value = value;
    } else {
      state.formFields.push({
        ref,
        value,
      });
    }
  }

  function getInputType(el: HTMLInputElement): boolean {
    if (el.type && el.type === "button") return true;
    return false;
  }

  function updateFormItems(): void {
    const refs: Refs | undefined = vueContext.$root?.$refs
      ? (vueContext.$root?.$refs as Refs)
      : undefined;

    if (refs) {
      for (const [key, element] of Object.entries(refs)) {
        if (isButton(element))
          state.buttons.push({
            ref: key,
          });
        else if (isInputFields(element))
          state.formFields.push({
            ref: key,
            value: element.value,
          });
      }
    }
  }

  function getListener(): keyof HTMLElementEventMap {
    if (vueContext.realtime) {
      return "input";
    } else {
      return "change";
    }
  }

  function isButton(el: HTMLElement): boolean {
    if (el.tagName === "BUTTON" || getInputType(el as HTMLInputElement)) {
      return true;
    }
    return false;
  }

  function addingListeners(): void {
    const refs: Refs | undefined = vueContext.$root?.$refs
      ? (vueContext.$root?.$refs as Refs)
      : undefined;
    if (refs)
      for (const [key, element] of Object.entries(refs)) {
        if (isButton(element)) {
          element.addEventListener("click", (e: Event) => {
            e.preventDefault();
            vueContext.formButtonClicked({
              ref: key,
              formData: state.formFields,
            });
          });
        } else if (isInputFields(element))
          element.addEventListener(getListener(), () => {
            update(key, element.value);
            vueContext.formItemChange({
              ref: key,
              value: element.value,
            });
          });
      }
  }

  return {
    state,
    init,
  };
}
