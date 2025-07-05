<script setup lang="ts">
const password = defineModel<string>();

withDefaults(
  defineProps<{
    placeholder?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
  }>(),
  {
    placeholder: "Введіть ваш пароль",
    size: "xl",
  },
);

const show = ref(false);
</script>

<template>
  <UInput
    v-model="password"
    class="w-full"
    :placeholder
    :size
    :type="show ? 'text' : 'password'"
    autocomplete="password"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Сховати пароль' : 'Показати пароль'"
        :aria-pressed="show"
        aria-controls="password"
        @click="show = !show"
      />
    </template>
  </UInput>
</template>
