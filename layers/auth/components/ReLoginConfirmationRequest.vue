<script setup lang="ts">
import { useAuthSlideoverStore } from "../stores/auth-slideover";
import AuthFormHeadline from "./AuthFormHeadline.vue";

const { user } = useUserSession();

const unconfirmedContact = computed(() => {
  if (user.value?.data?.phone && !user.value?.data?.phoneVerified) {
    return {
      type: "phone",
      contact: user.value?.data?.phone,
    };
  }
  if (user.value?.data?.email && !user.value?.data?.emailVerified) {
    return {
      type: "email",
      contact: user.value?.data?.email,
    };
  }
  return null as never;
});

const authSlideoverStore = useAuthSlideoverStore();
const { mutate: updateContact, isPending } = useUpdateContact();

const confirmHandler = () => {
  updateContact(unconfirmedContact.value.contact, {
    onSuccess: () => {
      authSlideoverStore.setStage("confirm-second-contact");
    },
  });
};

const changeHandler = () => {
  authSlideoverStore.setStage("contact-change-request");
};
</script>

<template>
  <div>
    <AuthFormHeadline
      title="Останній штрих"
      :description="[
        unconfirmedContact.type === 'phone' && 'Ви вказали цей номер під час знайомства, але не встигли його підтвердити.',
        unconfirmedContact.type === 'email' && 'Ви вказали цю пошту під час знайомства, але не встигли її підтвердити.',
        'Зробіть це зараз, щоб мати два способи входу та зв’язку щодо ваших запитів.']
        .filter(Boolean)
        .join(' ')"
    />

    <div class="my-10 text-center text-lg font-bold">
      {{ unconfirmedContact.contact }}
    </div>

    <UButton
      class="mb-2"
      block
      :loading="isPending"
      @click="confirmHandler"
    >
      Підтвердити {{ unconfirmedContact.type === 'phone' ? 'цей номер' : 'цю пошту' }}
    </UButton>
    <UButton variant="outline" block @click="changeHandler">
      Змінити {{ unconfirmedContact.type === 'phone' ? 'номер' : 'пошту' }}
    </UButton>
  </div>
</template>
