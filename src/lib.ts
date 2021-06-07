import { App } from "@vue/runtime-core";
import components from "./components";
import { FormItem } from "./models";

export default {
  install: (app: App): void => {
    app.use(components);
  },
};

export { FormItem };
