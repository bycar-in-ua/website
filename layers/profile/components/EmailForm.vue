<script setup lang="ts">
import { useEmailForm } from "../composables/useEmailForm";
import ProfileFormField from "./ProfileFormField.vue";

const authStore = useAuthStore();

const form = useTemplateRef("form");

const {
  state, formSchema, sendVerification, emailSendLoading, isNewEmail,
}
  = useEmailForm();
</script>

<template>
  <UForm ref="form" :state="state" :schema="formSchema">
    <ProfileFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        class="w-full"
        :loading="emailSendLoading"
        :ui="{
          base: isNewEmail ? 'pe-32' : '',
        }"
      >
        <template #trailing>
          <UIcon
            v-if="authStore.user?.emailVerified && !isNewEmail"
            name="i-lucide-check"
            class="text-success"
            title="Email верифікований"
          />

          <UButton
            v-if="isNewEmail"
            variant="link"
            color="primary"
            size="sm"
            :disabled="!!form?.errors?.length"
            @click="sendVerification()"
          >
            Змінити email
          </UButton>
        </template>
      </UInput>

      <template
        v-if="
          authStore.user?.email && !authStore.user?.emailVerified && !isNewEmail
        "
        #help
      >
        Email не верифікований. Будь ласка, перевірте свою пошту, включно з
        папкою "Спам" та перейдіть за посиланням у листі.
        <br>
        Якщо лист не приходить,
        <ULink
          class="text-primary cursor-pointer"
          @click.prevent="sendVerification"
        >
          натисніть сюди
        </ULink>
        щоб відправити верифікаційний лист ще раз.
      </template>
    </ProfileFormField>
  </UForm>
</template>
