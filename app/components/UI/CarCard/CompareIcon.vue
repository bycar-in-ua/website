<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

const props = defineProps<{
  isCompared?: boolean;
  carId: number;
  title?: string;
  toggleCompare: (carId: number, title?: string) => Promise<void>;
}>();

const { mutateAsync, isPending } = useMutation({
  mutationKey: ["toggle-compare", props.carId],
  mutationFn: () => props.toggleCompare(props.carId, props.title),
});
</script>

<template>
  <UIcon
    name="i-lucide-scale"
    class="size-5"
    :class="{ 'animate-ping': isPending, 'fill-current': isCompared }"
    @click.prevent.stop="mutateAsync"
  />
</template>
