<script setup lang="ts">
withDefaults(defineProps<{
  color?: string;
}>(), { color: "var(--ui-primary)" });
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="bg-primary outline-3 outline-offset-2 outline-primary rounded-[16px] px-6 py-3 sm:px-8 sm:py-4 text-center text-white text-xl sm:text-2xl font-bold uppercase leading-tight">
      <slot />
    </div>
    <img
      src="/images/road-sign-base.png"
      class="w-6 h-16 bg-top mt-1.5 sign-base"
    >
  </div>
</template>

<style>
.sign-base {
  mask-image: linear-gradient(to bottom, black 50%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent);
}
</style>
