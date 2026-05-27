<script setup lang="ts">
import { BookmarkFilled } from "~/components/UI/Icons";
import { useProfile } from "#layers/profile/composables/useProfile";
import type { CardType } from "./interface";

const props = defineProps<{
  carId: number;
  cardType: CardType;
  carTitle?: string;
}>();

const { profile, toggleFavorite } = useProfile();

const isSaved = computed(() => profile.data.value?.savedCars?.includes(props.carId));

const isSaving = ref(false);

const handleSave = () => {
  isSaving.value = true;
  toggleFavorite({
    carId: props.carId,
    carType: props.cardType,
    title: props.carTitle,
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
