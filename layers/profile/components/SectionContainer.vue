<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-5">
      <div class="flex justify-between">
        <div class="text-lg lg:text-xl sm:text-2xl font-medium">
          {{ title }}
        </div>

        <div class="flex flex-col-reverse xs:flex-row justify-end gap-3">
          <UButton variant="outline">Скинути</UButton>
          <UButton> Зберегти </UButton>
        </div>
      </div>

      <USeparator />
    </div>

    <slot />
  </div>
</template>
