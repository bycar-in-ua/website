<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <slot name="icon">
      <UIcon name="i-heroicons-inbox" class="w-16 h-16 bg-gray-400" />
    </slot>

    <div class="text-gray-500">
      <slot> Нічого не знайдено </slot>
    </div>
  </div>
</template>
