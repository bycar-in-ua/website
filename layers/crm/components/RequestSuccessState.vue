<script setup lang="ts">
import RoadSign from "~/components/UI/RoadSign.vue";

const props = defineProps<{
  direct: boolean;
  loggedIn: boolean;
  resolutionDeadline: Date | string | null;
  hasFlexibleSearch: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
}>();

const formattedDeadline = computed(() => {
  if (!props.resolutionDeadline) return null;

  const date = new Date(props.resolutionDeadline);

  return date.toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });
});

const description = computed(() => {
  if (props.direct) {
    if (props.loggedIn) {
      return "Вибір зафіксовано. Очікуйте на дзвінок дилера найближчим часом. Деталі вже з'явилися у розділі «Мої пропозиції» особистого кабінета.";
    }
    return "Вибір зафіксовано. Очікуйте на дзвінок дилера найближчим часом. Ми надіслали код для входу в кабінет вам у SMS.";
  }

  const parts: string[] = [];

  if (props.hasFlexibleSearch) {
    parts.push("Шукаємо авто та схожі моделі");
  }

  if (formattedDeadline.value) {
    parts.push(`Пропозиції будуть готові до ${formattedDeadline.value}.`);
  }

  if (props.loggedIn) {
    parts.push("Результати з'являться у розділі «Мої пропозиції» особистого кабінета.");
  } else {
    parts.push("Ми надіслали інструкцію та код для входу в кабінет вам у SMS.");
  }

  return parts.join("\n");
});
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center grow gap-6 h-full">
    <RoadSign>
      Запит
      <br>
      прийнято
    </RoadSign>

    <p class="text-base font-medium text-gray-700 whitespace-pre-line max-w-sm">
      {{ description }}
    </p>

    <UButton
      v-if="loggedIn"
      block
      size="xl"
      to="/profile"
    >
      Перейти до моїх пропозицій
    </UButton>
    <UButton
      v-else
      block
      size="xl"
      @click="emit('navigate')"
    >
      Увійти в кабінет
    </UButton>
  </div>
</template>
