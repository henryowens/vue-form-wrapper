# Installation & Usage

## Install

### Yarn

`yarn add vue-console-component`

### NPM

`npm install vue-console-component`

## Usage

### In Component

Example usage inside a component.

#### JavaScript

```vue
<template>
    <console pre-text="vue-console-comp" @input-console="inputConsole" />
</template>

<script>
import { Console } from "vue-console-component";
export default {
  name: "MyComponent",
  components: { Console },
  inputConsole(msg) {
    console.log('msg', msg)
  }
};
</script>
```

#### TypeScript

```vue
<template>
    <console pre-text="vue-console-comp" @input-console="inputConsole" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Console } from "vue-console-component";

@Options({
  components: { console: Console },
})
export default class MyComponent extends Vue {
  public inputConsole(msg: string): void {
    console.log('msg', msg)
  }
}
</script>
```

### Globally

Example of global installation.

`src/main.ts`

```typescript
import { createApp } from "vue";
import App from "./App.vue";

import Console from "vue-console-component";

createApp(App).use(Console).mount("#app");
```

`MyComponent.vue`

```vue
<template>
  <console pre-text="vue-console-comp" />
</template>
```
