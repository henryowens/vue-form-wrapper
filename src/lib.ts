import { App } from "@vue/runtime-core";
import components from "./components";

export default {
  install: (app: App): void => {
    app.use(components);
  },
};
