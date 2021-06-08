<template>
  <form class="form-wrapper">
    <slot />
  </form>
</template>

<script lang="ts">
// packages
import { Options, prop, setup, Vue, WithDefault } from "vue-class-component";

// composables
import { IForm, useForms } from "../composables/form";

// models
import { FormField, FormButtonPayload } from "../models/form";

class Props {
  realtime: WithDefault<boolean> = prop<boolean>({
    required: false,
    default: false,
  });
}

@Options({})
export default class FormWrapper extends Vue.with(Props) {
  public form: IForm = setup(() => useForms());

  public formItemChange(formField: FormField): void {
    this.$emit("form-item-change", formField);
  }

  public formButtonClicked(formButtonPayload: FormButtonPayload): void {
    this.$emit("form-button-clicked", formButtonPayload);
  }
}
</script>
