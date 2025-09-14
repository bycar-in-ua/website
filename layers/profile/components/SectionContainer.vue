<script setup lang="ts">
defineProps<{ title: string; }>();
</script>

<template>
  <section>
    <div class="flex justify-between items-center flex-wrap gap-4 my-8">
      <div class="text-lg lg:text-xl sm:text-2xl font-medium">
        {{ title }}
      </div>

      <div class="flex flex-col-reverse xs:flex-row justify-end gap-3">
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </section>
</template>
