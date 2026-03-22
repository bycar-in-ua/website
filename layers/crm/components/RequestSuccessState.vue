<script setup lang="ts">
import RoadSign from "~/components/UI/RoadSign.vue";

const props = defineProps<{
  direct: boolean;
  resolutionDeadline: Date | string | null;
  otpSent: boolean;
  hasFlexibleSearch: boolean;
  contactChannel: "SMS" | "Email";
}>();

const { loggedIn } = useUserSession();

const formattedDeadline = computed(() => {
  if (!props.resolutionDeadline) return null;

  const date = typeof props.resolutionDeadline === "string"
    ? new Date(props.resolutionDeadline)
    : props.resolutionDeadline;

  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
  });
});

const description = computed(() => {
  if (props.direct) {
    if (loggedIn.value) {
      return "Вибір зафіксовано. Очікуйте на дзвінок дилера найближчим часом. Деталі вже з'явилися у розділі «Мої пропозиції» особистого кабінета.";
    }
    return `Вибір зафіксовано. Очікуйте на дзвінок дилера найближчим часом. Ми надіслали код для входу в кабінет вам у ${props.contactChannel}.`;
  }

  const parts: string[] = [];

  if (props.hasFlexibleSearch) {
    parts.push("Шукаємо авто та схожі моделі");
  }

  if (formattedDeadline.value) {
    parts.push(`Пропозиції будуть готові до ${formattedDeadline.value}.`);
  }

  if (loggedIn.value) {
    parts.push("Результати з'являться у розділі «Мої пропозиції» особистого кабінета.");
  } else {
    parts.push(`Ми надіслали інструкцію та код для входу в кабінет вам у ${props.contactChannel}.`);
  }

  return parts.join("\n");
});

const ctaLabel = computed(() =>
  loggedIn.value ? "Перейти до моїх пропозицій" : "Увійти в кабінет",
);

const emit = defineEmits<{
  navigate: [];
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center grow gap-6 px-4">
    <RoadSign>
      Запит
      <br>
      прийнято
    </RoadSign>

    <p class="text-base font-medium text-gray-700 whitespace-pre-line max-w-sm">
      {{ description }}
    </p>
  </div>

  <div class="grow" />

  <UButton
    block
    size="xl"
    class="uppercase font-semibold"
    @click="emit('navigate')"
  >
    {{ ctaLabel }}
  </UButton>
</template>
