<script setup>
import { reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();

const user = computed(() => {
  return userStore.user;
});

const profileForm = reactive({
  name: user.value.name,
  email: user.value.login,
});

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

const submitProfile = () => {
  mainStore.setUser(profileForm);
};

const submitPass = () => {
  //
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <FormField label="Имя" help="Обязательное поле">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
            />
          </FormField>
          <FormField label="E-mail" help="Обязательное поле">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Изменить" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField label="Новый пароль">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
            />
          </FormField>

          <FormField label="Подтверждение пароля">
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton type="submit" color="info" label="Изменить пароль" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
