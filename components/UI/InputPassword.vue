<script setup lang="ts">
const password = defineModel<string>();
const props = defineProps<{
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}>();
const show = ref(false);
</script>

<template>
  <UInput
    v-model="password"
    :placeholder="props.placeholder ?? 'Введіть ваш пароль'"
    class="w-full"
    :size="props.size ?? 'xl'"
    :type="show ? 'text' : 'password'"
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
