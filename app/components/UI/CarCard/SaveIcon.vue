<script setup lang="ts">
import { BookmarkFilled } from "~/components/UI/Icons";
import { useProfile } from "#layers/profile/composables/useProfile";
import type { CardType } from "./interface";

const props = defineProps<{
  carId: number;
  cardType: CardType;
}>();

const { profile, toggleFavorite } = useProfile();

const isSaved = computed(() => {
  const targetIds = props.cardType === "model" ? profile.data.value?.savedCars : profile.data.value?.savedAvailableCars;
  return targetIds?.includes(props.carId);
});

const isSaving = ref(false);

const handleSave = () => {
  isSaving.value = true;
  toggleFavorite({
    carId: props.carId,
    carType: props.cardType,
  }).finally(() => {
    isSaving.value = false;
  });
};
</script>

<template>
  <UIcon
    :name="isSaved ? BookmarkFilled : 'i-lucide-bookmark'"
    class="size-5"
    :class="{ 'animate-ping': isSaving, 'fill-current': isSaved }"
    @click.prevent.stop="handleSave"
  />
</template>
