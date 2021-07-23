import { Plugin } from "vue";
import { FormButtonPayload, FormField } from "../src/lib";

declare const vueFormWrapper: Exclude<Plugin["install"], undefined>;

export default vueFormWrapper;

export { FormButtonPayload, FormField };
