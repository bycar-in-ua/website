<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";

defineEmits(["affixClick"]);

const showHelp = useLocalStorage<boolean>("help-viewed", false);
const helpClosed = useLocalStorage<boolean>("help-closed", false);

const showPopover = ref(false);

let timeoutId: number | undefined;

onMounted(() => {
  if (!showHelp.value) {
    timeoutId = window.setTimeout(() => {
      showHelp.value = true;

      setTimeout(() => {
        showPopover.value = true;
      }, 200);
    }, 20_000);
  }
});

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<template>
  <UPopover
    v-if="showHelp"
    v-model:open="showPopover"
    :popper="{ placement: 'left' }"
    mode="hover"
    class="fixed bottom-4 right-4 z-50"
    :ui="{
      base: 'overflow-visible',
    }"
  >
    <UButton
      icon="i-heroicons-chat-bubble-left"
      :class="{
        'animate-[bounce_1s_3_forwards]': !helpClosed,
      }"
      :ui="{
        rounded: 'rounded-full',
        icon: {
          base: 'transition-all',
          size: { xl: helpClosed ? 'h-6 w-6' : 'h-10 w-10' },
        },
      }"
      size="xl"
      circle
      @click="$emit('affixClick')"
    />

    <template #panel>
      <div v-if="helpClosed" class="p-2">Замовити консультацію</div>
      <div v-else class="relative p-2 pr-8 max-w-56">
        <UButton
          icon="i-heroicons-x-mark"
          :padded="false"
          class="absolute right-2 top-2"
          :ui="{
            rounded: 'rounded-full',
          }"
          size="xs"
          color="gray"
          variant="outline"
          @click="
            () => {
              helpClosed = true;
              showPopover = false;
            }
          "
        />
        Потрібна допомога з вибором авто? Залиште заявку і наш експерт
        зв'яжеться із Вами найближчим часом.
      </div>
    </template>
  </UPopover>
</template>
