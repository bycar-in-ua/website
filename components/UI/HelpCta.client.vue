<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";

const emit = defineEmits(["affixClick"]);

const showHelp = useLocalStorage<boolean>("helpViewed", false);
const helpClosed = useLocalStorage<boolean>("helpClosed", false);

const showPopover = ref(false);

let timeoutId: number | undefined;

const clickHandler = () => {
  emit("affixClick");

  setTimeout(() => {
    helpClosed.value = true;
  }, 1000);
};

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
  >
    <UButton
      icon="i-heroicons-chat-bubble-left"
      :class="{
        'animate-[bounce_1s_3_forwards]': !helpClosed,
      }"
      :ui="{
        base: 'rounded-full',
        leadingIcon: `transition-all ${
          helpClosed ? 'h-6 w-6' : 'h-10 w-10'
        }`,
      }"
      size="xl"
      circle
      @click="clickHandler"
    />

    <template #content>
      <div v-if="helpClosed" class="p-2">
        Замовити консультацію
      </div>
      <div v-else class="relative p-2 pr-8 max-w-64">
        <UButton
          icon="i-heroicons-x-mark"
          :padded="false"
          class="absolute right-2 top-2"
          :ui="{
            base: 'rounded-full',
          }"
          size="xs"
          color="neutral"
          variant="outline"
          @click="
            () => {
              helpClosed = true;
              showPopover = false;
            }
          "
        />
        <span class="font-semibold">Потрібна допомога з вибором авто?</span>
        <br />
        Залиште заявку і наш експерт зв'яжеться із Вами найближчим часом.
      </div>
    </template>
  </UPopover>
</template>
