import { DefineComponent, Plugin } from "vue";
import { FormButtonPayload, FormField } from "../src/lib";

declare const vueFormWrapper: Exclude<Plugin["install"], undefined>;

export default vueFormWrapper;

export { FormButtonPayload, FormField };

declare module "*.vue" {
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >;
  export default component;
}
