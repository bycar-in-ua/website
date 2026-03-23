<script setup lang="ts">
import { useSignIn } from "#layers/auth/composables/useSignIn";
import DrawerSlideover from "~/components/UI/DrawerSlideover.vue";
import type { RequestFormProps } from "../crm.types";
import { useCarRequestStore } from "../stores/car-request";
import RequestForm from "./RequestForm.vue";
import RequestSuccessState from "./RequestSuccessState.vue";

const props = defineProps<RequestFormProps & { close?: () => void; }>();

const formId = computed(() => props.direct ? "this-offer-request-form" : "all-offers-request-form");

const copy = computed(() => props.direct
  ? {
      heading: "Отримання пропозиції",
      subheading: "Найкоротший шлях до авто",
      description: "Залиште запит — і ми передамо ваші дані дилеру, щоб він якнайшвидше зв'язався з вами для обговорення деталей та узгодження умов.",
      steps: [
        "Обговорення умов із дилером",
        "Оформлення та отримання авто",
      ],
      submitLabel: "Отримати цю пропозицію",
    }
  : {
      heading: "Запит пропозицій",
      subheading: "Ваші індивідуальні умови",
      description: "Залиште запит — і ми зробимо всю роботу. Актуальні пропозиції надійдуть в особистий кабінет, де ви зможете порівняти їх, зробити вибір і перейти до оформлення покупки.",
      steps: [
        "Отримання пропозицій в кабінеті",
        "Порівняння цін та комплектацій",
        "Оформлення та отримання авто",
      ],
      submitLabel: "Запитати пропозиції",
    },
);

const store = useCarRequestStore();
const {
  stage, successData, isPending,
} = storeToRefs(store);
const { loggedIn } = useUserSession();
const authSlideover = useAuthSlideover();

const signIn = useSignIn();

function onNavigate() {
  props?.close?.();

  signIn.setStage("confirm-otp");

  // TODO: open auth slideover with prefilled phone & OTP stage
  authSlideover.openSlideover("/profile");
}
</script>

<template>
  <DrawerSlideover :hide-borders="stage === 'success'">
    <template v-if="stage !== 'success'" #header>
      <div>
        <h3 class="text-xl sm:text-3xl font-bold">
          <span class="text-primary">{{ copy.heading }}</span>
          <br>
          {{ copy.subheading }}
        </h3>
        <div class="flex items-start gap-2 mt-4">
          <p class="flex-1 text-base font-medium leading-relaxed text-gray-700">
            {{ copy.description }}
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
                  v-for="(step, i) in copy.steps"
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
        v-if="stage === 'success' && successData"
        :direct="props.direct ?? false"
        :logged-in="loggedIn"
        :resolution-deadline="successData.resolutionDeadline"
        :has-flexible-search="Boolean(successData.vehicleFlexible || successData.trimFlexible)"
        @navigate="onNavigate"
      />
      <RequestForm
        v-else
        :id="formId"
        v-bind="props"
      />
    </template>

    <template v-if="stage === 'form'" #footer>
      <div class="grow">
        <UButton
          :form="formId"
          type="submit"
          :loading="isPending"
          block
        >
          {{ copy.submitLabel }}
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
