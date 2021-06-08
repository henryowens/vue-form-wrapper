import { onMounted } from "@vue/runtime-core";

export function composeForm(): {
  state: any;
  init: () => void;
} {
  const state: any = {};

  function init(): void {
    // onMounted(() => {
    //   console.log("on mounted");
    // });
    // state = _state;
    console.log(init);
  }
  return { ...state };
}
