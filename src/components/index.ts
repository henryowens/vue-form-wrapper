// packages
import { App } from "@vue/runtime-core";

// components
import FormWrapper from "../components/FormWrapper.vue";

export default {
  install: (app: App): void => {
    app.component("vue-form-wrapper", FormWrapper);
  },
};
