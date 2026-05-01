<script setup lang="ts">
import { useMutationState, type MutationState } from "@tanstack/vue-query";
import type { UpdateContactResponse } from "@bycar-in-ua/auth-sdk";
import { useUpdateContact } from "../composables/useUpdateContact";
import { useVerifyContact } from "../composables/useVerifyContact";
import { useAuthSlideoverStore } from "../stores/auth-slideover";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const mutations = useMutationState({ filters: { mutationKey: ["auth", "update-contact"] } });

const latestMutation = computed(() => {
  const latest = mutations.value?.at(-1) as MutationState<UpdateContactResponse, unknown, string> | undefined;

  if (!latest) {
    return;
  }

  return {
    contactType: latest.data?.contactType,
    contact: latest.variables,
  };
});

const description = computed(() => {
  let contactPart = "";

  if (latestMutation.value?.contactType === "phone") {
    contactPart = `Надіслали SMS із кодом на телефон ${latestMutation.value.contact}.`;
  }

  if (latestMutation.value?.contactType === "email") {
    contactPart = `Надіслали лист із кодом на пошту ${latestMutation.value.contact}.`;
  }

  return [contactPart, "Введіть його нижче, щоб ми знали, що це саме ви."].join(" ");
});

const authSlideoverStore = useAuthSlideoverStore();
const pinModel = ref([]);

const { mutateAsync: updateContact } = useUpdateContact();

const resendHandler = async () => {
  if (!latestMutation.value?.contact) {
    return;
  }

  await updateContact(latestMutation.value.contact, {
    onSuccess: () => {
      authSlideoverStore.startOtpTimer();
    },
  });
};

const { mutateAsync: verifyContact, isPending: isVerifying } = useVerifyContact();

const submitHandler = async () => {
  if (pinModel.value.length !== 4) {
    return;
  }

  await verifyContact({ code: pinModel.value.join("") }, {
    onSuccess: () => {
      authSlideoverStore.closeSlideover();
      useUserSession().fetch();
    },
  });
};
</script>

<template>
  <UForm :disabled="isVerifying" @submit="submitHandler">
    <AuthFormHeadline title="Останній штрих" :description class="mb-10" />

    <UFormField label="Введіть код" name="otp" :ui="{ root: 'mb-6 sm:mb-8', help: 'text-sm font-medium' }">
      <UPinInput
        v-model="pinModel"
        :length="4"
        placeholder="—"
        class="w-full"
      />
    </UFormField>

    <UButton
      block
      type="submit"
      :loading="isVerifying"
    >
      Продовжити
    </UButton>
    <OtpTimer class="mt-4 md:mt-3" :timer="authSlideoverStore.otpTimer" @resend="resendHandler" />
  </UForm>
</template>
