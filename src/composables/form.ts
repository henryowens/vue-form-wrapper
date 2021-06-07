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

  function isInputFields(el: HTMLElement) {
    if (
      Object.values(HTMLInputTagName).includes(el.tagName as HTMLInputTagName)
    )
      return true;
    return false;
  }

  function update(ref: string, value: unknown) {
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

  function getListener(): keyof HTMLElementEventMap {
    if (vueContext.realtime) {
      return "input";
    } else {
      return "change";
    }
  }

  function addingListeners(): void {
    const refs: Refs | undefined = vueContext.$root?.$refs
      ? (vueContext.$root?.$refs as Refs)
      : undefined;
    if (refs)
      for (const [key, element] of Object.entries(refs)) {
        if (isInputFields(element))
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
