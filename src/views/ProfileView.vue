<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <span class="text-[13px] font-bold mb-[10px]">
            ФИО {{ checkChange("name") }}
          </span>
          <FormField help="Обязательное поле">
            <FormControl
              v-model="profileForm.name"
              :icon="mdiAccount"
              name="username"
              required
            />
          </FormField>
          <span class="text-[13px] font-bold mb-[10px]">
            Email {{ checkChange("login") }}
          </span>
          <FormField help="Обязательное поле">
            <FormControl
              v-model="profileForm.login"
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
          <FormField label="Текущий пароль">
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
            />
          </FormField>

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

<script setup>
import { reactive } from "vue";
import { mdiAccount, mdiMail, mdiFormTextboxPassword } from "@mdi/js";
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

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

import md5 from "md5";

const userStore = useUserStore();

const user = computed(() => {
  return userStore.user;
});

const profileForm = reactive({
  name: user.value.name,
  login: user.value.login,
});

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

const submitProfile = () => {
  const changeData = {
    id: user.value.id,
    login: profileForm.login,
    name: profileForm.name,
    password: user.value.password,
  };
  userStore
    .editUser(changeData)
    .then(() => {
      ElNotification({
        type: "success",
        duration: 1500,
        showClose: true,
        message: "Успешно изменено",
      });
    })
    .catch(() => {
      ElNotification({
        type: "error",
        duration: 1500,
        showClose: true,
        message: "Ошибка при изменении",
      });
    });
};

const checkChange = (field) => {
  if (user.value[field] !== profileForm[field]) {
    return "(изменено)";
  }
};

const submitPass = () => {
  if (user.value.password !== md5(passwordForm.password_current.trim())) {
    ElNotification({
      type: "error",
      duration: 5000,
      showClose: true,
      message: "Вы ввели неверный текущий пароль",
    });
    return;
  }

  if (
    passwordForm.password.trim() !== passwordForm.password_confirmation.trim()
  ) {
    ElNotification({
      type: "error",
      duration: 5000,
      showClose: true,
      message: "Введенные вами пароли не совпадают",
    });
    return;
  }

  const changeData = {
    id: user.value.id,
    lgoin: user.value.login,
    name: user.value.name,
    password: md5(passwordForm.password_confirmation),
  };

  userStore
    .editUser(changeData)
    .then(() => {
      ElNotification({
        type: "success",
        duration: 1500,
        showClose: true,
        message: "Пароль успешно изменен",
      });
    })
    .catch((error) => {
      console.log("error", error);
      ElNotification({
        type: "error",
        duration: 1500,
        showClose: true,
        message: "Во время смены пароля произошла ошибка",
      });
    })
    .finally(() => {
      passwordForm.password = "";
      passwordForm.password_confirmation = "";
      passwordForm.password_current = "";
    });
};
</script>
