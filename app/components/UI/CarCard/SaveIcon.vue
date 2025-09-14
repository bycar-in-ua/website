<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

const props = defineProps<{
  isSaved?: boolean;
  carId: number;
  title?: string;
  toggleSave: (carId: number, title?: string) => Promise<void>;
}>();

const { mutateAsync, isPending } = useMutation({
  mutationKey: ["toggle-save", props.carId],
  mutationFn: () => props.toggleSave(props.carId, props.title),
});
</script>

<template>
  <UIcon
    :name="isSaved ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
    class="size-7 text-white hover:text-gray-300 transition-colors duration-300"
    :class="{ 'animate-ping': isPending }"
    @click.prevent.stop="mutateAsync"
  />
</template>
