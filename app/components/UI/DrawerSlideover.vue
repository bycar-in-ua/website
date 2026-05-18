<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { twMerge } from "tailwind-merge";

type Props = {
  title?: string;
  ui?: {
    header?: string;
    body?: string;
    footer?: string;
  };
};

defineProps<Props>();

const breakpoints = useBreakpoints(breakpointsTailwind);

const isSlideover = breakpoints.greater("md");

const open = defineModel<boolean>("open", { default: false });

const closeHandler = () => {
  open.value = false;
};
</script>

<template>
  <USlideover
    v-if="isSlideover"
    v-model:open="open"
    inset
    close
    :ui="{
      ...ui,
      header: twMerge(ui?.header, 'justify-between'),
      content: 'md:max-w-131 w-full',
    }"
  >
    <template #header>
      <slot name="header" :close="closeHandler" :is-slideover="isSlideover">
        <h2 class="text-lg font-bold uppercase">
          {{ title }}
        </h2>

        <UButton
          icon="i-lucide-x"
          square
          variant="link"
          color="secondary"
          class="p-0"
          @click="closeHandler"
        />
      </slot>
    </template>

    <template #body>
      <slot name="body" :close="closeHandler" :is-slideover="isSlideover" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" :close="closeHandler" :is-slideover="isSlideover" />
    </template>
  </USlideover>

  <UDrawer
    v-else
    v-model:open="open"
    direction="bottom"
    inset
    :ui="{
      ...ui,
      header: twMerge(ui?.header, 'flex justify-between items-center'),
      container: 'h-full',
      content: 'h-full max-h-[90svh]',
    }"
  >
    <template #header>
      <slot name="header" :close="closeHandler" :is-slideover="isSlideover">
        <div class="basis-1/5 flex items-center">
          <slot name="drawer-header-extra" />
        </div>

        <h2 class="text-lg font-bold basis-3/5 text-center">
          {{ title }}
        </h2>

        <div class="basis-1/5 flex items-center justify-end">
          <UButton
            icon="i-lucide-x"
            square
            variant="link"
            color="neutral"
            class="p-0 ms-auto"
            @click="closeHandler"
          />
        </div>
      </slot>
    </template>

    <template #body>
      <slot name="body" :close="closeHandler" :is-slideover="isSlideover" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" :close="closeHandler" :is-slideover="isSlideover" />
    </template>
  </UDrawer>
</template>
