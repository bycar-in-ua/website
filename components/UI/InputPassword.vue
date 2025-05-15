<script setup lang="ts">
const password = defineModel<string>();
const props = defineProps<{ placeholder?: string }>();
const show = ref(false);
</script>

<template>
  <UInput
    v-model="password"
    :placeholder="props.placeholder ?? 'Введіть ваш пароль'"
    class="w-full"
    size="xl"
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
