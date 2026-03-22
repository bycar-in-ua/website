<script setup lang="ts">
import type { CreateLeadResponse } from "@bycar-in-ua/crm-sdk";
import { useMutationState } from "@tanstack/vue-query";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { RequestFormProps } from "../crm.types";
import RequestForm from "./RequestForm.vue";
import RequestSuccessState from "./RequestSuccessState.vue";

const props = defineProps<RequestFormProps>();

const tooltipSteps = [
  "Отримання пропозицій в кабінеті",
  "Порівняння цін та комплектацій",
  "Оформлення та отримання авто",
];

const mutationsState = useMutationState({ filters: { mutationKey: ["create-lead"] } });

const isPending = computed(() => mutationsState.value.some((m) => m.status === "pending"));

const successData = ref<CreateLeadResponse | null>(null);

function onSuccess(data: CreateLeadResponse) {
  successData.value = data;
}

const { loggedIn } = useUserSession();
const authSlideover = useAuthSlideover();

function onNavigate() {
  if (loggedIn.value) {
    navigateTo("/profile");
  } else {
    authSlideover.openSlideover("/profile");
  }
}
</script>

<template>
  <DrawerSlideover>
    <template v-if="!successData" #header>
      <div>
        <h3
          class="text-xl sm:text-3xl font-bold"
        >
          <span class="text-primary">Запит пропозицій</span>
          <br>
          Ваші індивідуальні умови
        </h3>
        <div class="flex items-start gap-2 mt-4">
          <p class="flex-1 text-base font-medium leading-relaxed text-gray-700">
            Залиште запит — і ми зробимо всю роботу.
            Актуальні пропозиції надійдуть в особистий кабінет,
            де ви зможете порівняти їх, зробити вибір і перейти
            до оформлення покупки.
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
      <RequestSuccessState
        v-if="successData"
        :direct="false"
        :resolution-deadline="successData.resolutionDeadline"
        :otp-sent="successData.otpSent"
        :has-flexible-search="Boolean(successData.vehicleFlexible || successData.trimFlexible)"
        @navigate="onNavigate"
      />
      <RequestForm
        v-else
        id="all-offers-request-form"
        v-bind="props"
        @success="onSuccess"
      />
    </template>

    <template v-if="!successData" #footer>
      <div class="grow">
        <UButton
          form="all-offers-request-form"
          type="submit"
          :loading="isPending"
          block
        >
          Запитати пропозиції
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
