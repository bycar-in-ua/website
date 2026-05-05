<script setup lang="ts">
import { BodyType } from "@bycar-in-ua/vehicles-sdk";
import { useQuizStore } from "../stores/quiz";
import type { BodyTypeOption } from "../quiz.types";
import StepContainer from "./StepContainer.vue";
import BodyTypeCard from "./BodyTypeCard.vue";

const quizStore = useQuizStore();

const bodyTypes: BodyTypeOption[] = [
  {
    value: BodyType.SUV,
    label: "Кросовер",
    subtitle: "від 5 до 8 місць",
    image: "/images/body-types/crossover.png",
    hoverImage: "/images/body-types/crossover-rotated.png",
  },
  {
    value: BodyType.sedan,
    label: "Седан",
    subtitle: "від 4 до 5 місць",
    image: "/images/body-types/sedan.png",
    hoverImage: "/images/body-types/sedan-rotated.png",
  },
  {
    value: BodyType.hatchback,
    label: "Хатчбек",
    subtitle: "від 2 до 5 місць",
    image: "/images/body-types/hatchback.png",
    hoverImage: "/images/body-types/hatchback-rotated.png",
  },
  {
    value: BodyType.universal,
    label: "Універсал",
    subtitle: "від 5 до 7 місць",
    image: "/images/body-types/universal.png",
    hoverImage: "/images/body-types/universal-rotated.png",
  },
  {
    value: BodyType.liftback,
    label: "Лайфтбек",
    subtitle: "від 4 до 5 місць",
    image: "/images/body-types/liftback.png",
    hoverImage: "/images/body-types/liftback-rotated.png",
  },
  {
    value: BodyType.coupe,
    label: "Купе",
    subtitle: "від 2 до 5 місць",
    image: "/images/body-types/coupe.png",
    hoverImage: "/images/body-types/coupe-rotated.png",
  },
  {
    value: BodyType.pickup,
    label: "Пікап",
    subtitle: "від 5 до 7 місць",
    image: "/images/body-types/pickup.png",
    hoverImage: "/images/body-types/pickup-rotated.png",
  },
  {
    value: BodyType.cabriolet,
    label: "Кабріолет",
    subtitle: "від 2 до 5 місць",
    image: "/images/body-types/cabriolet.png",
    hoverImage: "/images/body-types/cabriolet-rotated.png",
  },
  {
    value: BodyType.roadster,
    label: "Роадстер",
    subtitle: "2 місця",
    image: "/images/body-types/roadster.png",
    hoverImage: "/images/body-types/roadster-rotated.png",
  },
];

const checkHandler = (value: BodyType) => {
  if (quizStore.filters.bodyType?.includes(value)) {
    quizStore.filters.bodyType = quizStore.filters.bodyType?.filter((v) => v !== value);
  } else {
    quizStore.filters.bodyType?.push(value);
  }
};
</script>

<template>
  <StepContainer title="1. Який кузов вам ближчий?" subtitle="Від цього залежить ваш комфорт та простір.">
    <div class="grid gap-2 md:gap-5 grid-cols-2">
      <BodyTypeCard
        v-for="(option, index) in bodyTypes"
        :key="index"
        :option="option"
        :checked="quizStore.filters.bodyType?.includes(option.value)"
        @click="checkHandler(option.value)"
      />
    </div>
  </StepContainer>
</template>

<style>
.body-type-card-image {
  background-image: var(--bg-image);
}

.group:hover .body-type-card-image {
  background-image: var(--hover-bg-image);
}
</style>
