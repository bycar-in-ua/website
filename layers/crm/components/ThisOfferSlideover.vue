<script setup lang="ts">
import { useMutationState } from "@tanstack/vue-query";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { RequestFormProps } from "../crm.types";
import RequestForm from "./RequestForm.vue";

const props = defineProps<RequestFormProps>();

const tooltipSteps = [
  "Обговорення умов із дилером",
  "Оформлення та отримання авто",
];

const mutationsState = useMutationState({ filters: { mutationKey: ["create-lead"] } });

const isPending = computed(() => mutationsState.value.some((m) => m.status === "pending"));
</script>

<template>
  <DrawerSlideover>
    <template #header>
      <div>
        <h3
          class="text-xl sm:text-3xl font-bold"
        >
          <span class="text-primary">Отримання пропозиції</span>
          <br>
          Найкоротший шлях до авто
        </h3>
        <div class="flex items-start gap-2 mt-4">
          <p class="flex-1 text-base font-medium leading-relaxed text-gray-700">
            Залиште запит — і ми передамо ваші дані дилеру,
            щоб він якнайшвидше зв'язався з вами для обговорення
            деталей та узгодження умов.
          </p>
          <UPopover
            mode="hover"
            arrow
            :content="{ side: 'bottom', align: 'end' }"
            :ui="{ content: 'dark p-3' }"
          >
            <UIcon name="i-heroicons-information-circle" class="size-5 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer" />

            <template #content>
              <p class="text-white text-sm font-bold mb-2">
                Наступні кроки:
              </p>
              <div class="flex flex-col gap-2">
                <div
                  v-for="(step, i) in tooltipSteps"
                  :key="i"
                  class="flex items-center gap-2"
                >
                  <span class="size-4.5 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium shrink-0">
                    {{ i + 1 }}
                  </span>
                  <span class="text-gray-100 text-xs font-medium">{{ step }}</span>
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </div>
    </template>

    <template #body>
      <RequestForm id="this-offer-request-form" v-bind="props" />
    </template>

    <template #footer>
      <div class="grow">
        <UButton
          form="this-offer-request-form"
          type="submit"
          :loading="isPending"
          block
        >
          Отримати цю пропозицію
        </UButton>

        <p class="text-sm font-medium text-center mt-4 text-gray-900">
          Натискаючи кнопку, ви погоджуєтесь з
          <br>
          <ULink
            href="/privacy-policy"
            target="_blank"
            class="underline text-gray-900"
            color="secondary"
          >
            Політикою конфіденційності
          </ULink>
        </p>
      </div>
    </template>
  </DrawerSlideover>
</template>
