# vue-form-wrapper

Wrapper component for managing form data easily. For & built with Vue 3.

## Setup & Usage

### 1. Install in your project

```
npm i vue-form-wrapper
```

### 2. Use it in your app

```
import { createApp } from 'vue'
import App from '@/App.vue'

import VueFormBox from "vue-form-box"

createApp(App).use(VueFormBox).mount('#app')
```

### 3. Wrap your form!

```
<template>
  <vue-form-wrapper :realtime="false" @form-item-change="formItemChange">
    <h5>My Test Form</h5>
    <p>Welcome to my test form</p>
    <input ref="tempw3" type="text" value="my input" />
    <input ref="tempw4" type="number" />
  </vue-form-wrapper>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { FormField } from "vue-form-box"

@Options({})
export default class App extends Vue {
  public formItemChange(formField: FormField): void {
    console.log(formField);
  }
}
</script>
```
