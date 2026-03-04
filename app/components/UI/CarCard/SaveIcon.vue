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
    name="i-lucide-bookmark"
    class="size-5"
    :class="{ 'animate-ping': isPending, 'fill-current': isSaved }"
    @click.prevent.stop="mutateAsync"
  />
</template>
