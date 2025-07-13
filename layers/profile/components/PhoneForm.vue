<script setup lang="ts">
import { usePhoneForm } from "../composables/usePhoneForm";

const authStore = useAuthStore();

const form = useTemplateRef("form");

const {
  state,
  formSchema,
  codeValid,
  showCodeInput,
  isNewPhone,
  sendVerificationCode,
  sendingSms,
  timeToResend,
  verifyPhone,
  verifyingPhone,
} = usePhoneForm();
</script>

<template>
  <UForm ref="form" :state="state" :schema="formSchema" class="space-y-4">
    <ProfileFormField label="Телефон" name="phone">
      <UInput
        v-model="state.phone"
        class="w-full"
        :ui="{
          base: isNewPhone ? 'pe-36' : '',
        }"
      >
        <template #trailing>
          <UIcon
            v-if="authStore.user?.phoneVerified && !isNewPhone"
            name="i-lucide-check"
            class="text-success"
            title="Телефон верифікований"
          />

          <UButton
            v-if="isNewPhone"
            variant="link"
            color="primary"
            size="sm"
            :disabled="!!form?.errors?.length"
            :loading="sendingSms"
            @click="sendVerificationCode()"
          >
            Змінити телефон
          </UButton>
        </template>
      </UInput>

      <template v-if="!state.phone" #help>
        Схоже ви не прив'язали телефон до вашого профілю.
        <br />
        Ми радимо зробити це для безпеки аккаунту та швидшого зв'язку з вами.
      </template>
    </ProfileFormField>

    <ProfileFormField v-if="showCodeInput" label="Код із SMS" name="code">
      <div class="flex items-start flex-col sm:flex-row gap-4">
        <UPinInput v-model="state.code" :length="4" />

        <UButton
          :disabled="!codeValid"
          :loading="verifyingPhone"
          @click="verifyPhone()"
        >
          Підтвердити
        </UButton>
      </div>

      <template #help>
        Не прийшов код?
        <UButton
          variant="link"
          :disabled="timeToResend > 0"
          :loading="sendingSms"
          @click="sendVerificationCode()"
        >
          Відправити ще раз
          <template v-if="timeToResend > 0">(00:{{ timeToResend }})</template>
        </UButton>
      </template>
    </ProfileFormField>
  </UForm>
</template>
