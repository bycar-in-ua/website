<script setup lang="ts">
const props = defineProps<{ timer: number; }>();

const emit = defineEmits<{ resend: []; }>();

const canResendOtp = computed(() => {
  return props.timer === 0;
});

const twoDigits = new Intl.NumberFormat("uk-UA", {
  minimumIntegerDigits: 2,
  useGrouping: false,
});
</script>

<template>
  <div class="flex flex-col md:flex-row gap-1 justify-center items-center text-sm text-muted font-medium">
    <span>Не отримали код?</span>

    <UButton
      v-if="canResendOtp"
      label="Надіслати код повторно"
      variant="link"
      size="sm"
      @click="emit('resend')"
    />

    <span v-else>
      Надіслати повторно через
      <span class="font-semibold text-gray-900">
        00:{{ twoDigits.format(timer) }} сек
      </span>
    </span>
  </div>
</template>
