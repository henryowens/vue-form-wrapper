// packages
import { reactive } from "@vue/reactivity";

// models
import { FormItem, FormItems, HTMLInputTagName } from "../models/form";
import { Refs } from "../models/refs";

interface State {
  formItems: FormItems;
}

export interface IForm {
  state: State;
  init: (vueCntxt: any) => void;
}

export function useForms(): IForm {
  let vueContext: any = {};

  const state: State = reactive({
    formItems: [],
  });

  function init(vueCntxt: any): void {
    vueContext = vueCntxt;
    updateFormItems();
    addingListeners();
  }

  function isButtonType(el: HTMLInputElement): boolean {
    if (el.type !== "button") return true;
    return false;
  }

  function isInputFields(el: HTMLElement): boolean {
    if (
      Object.values(HTMLInputTagName).includes(
        el.tagName as HTMLInputTagName
      ) &&
      !isButtonType(el as HTMLInputElement)
    )
      return true;
    return false;
  }

  function isButton(el: HTMLElement): boolean {
    if (el.tagName === "INPUT") {
      if (isButtonType(el as HTMLInputElement)) {
        return true;
      }
    } else if (el.tagName === "BUTTON") {
      return true;
    }

    return false;
  }

  function update(ref: string, value: unknown): void {
    const index = state.formItems.findIndex(
      (formItem: FormItem) => formItem.ref === ref
    );
    if (index) {
      if (state.formItems[index].value !== value)
        state.formItems[index].value = value;
    } else {
      state.formItems.push({
        ref,
        value,
      });
    }
  }

  function updateFormItems(): void {
    const refs: Refs | undefined = vueContext.$root?.$refs
      ? (vueContext.$root?.$refs as Refs)
      : undefined;

    if (refs) {
      for (const [key, element] of Object.entries(refs)) {
        if (isInputFields(element))
          state.formItems.push({
            ref: key,
            value: element.value,
          });
      }
    }
  }

  function getListener(
    element: HTMLInputElement
  ): keyof HTMLElementEventMap | undefined {
    if (isInputFields(element)) {
      if (vueContext.realtime) {
        return "input";
      } else {
        return "change";
      }
    } else if (isButton(element)) {
      return "click";
    }
    return undefined;
  }

  function addingListeners(): void {
    const refs: Refs | undefined = vueContext.$root?.$refs
      ? (vueContext.$root?.$refs as Refs)
      : undefined;
    if (refs)
      for (const [key, element] of Object.entries(refs)) {
        if (isInputFields(element) || isButton(element)) {
          const listener = getListener(element);
          if (listener) {
            element.addEventListener(listener, () => {
              update(key, element.value);
              vueContext.formItemChange({
                ref: key,
                value: element.value,
              });
            });
          }
        }
      }
  }

  return {
    state,
    init,
  };
}
