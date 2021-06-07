import { App } from "@vue/runtime-core";
import components from "./components";
import { FormField, FormButtonPayload } from "./models";

export default {
  install: (app: App): void => {
    app.use(components);
  },
};

export { FormField, FormButtonPayload };
