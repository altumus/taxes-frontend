<template>
  <LayoutAuthenticated>
    <SectionMain v-if="editingUser">
      <CardBox is-form @submit.prevent="submit">
        <SectionTitleLineWithButton title="Изменение сотрудника" :icon="mdiPen">
          <span />
        </SectionTitleLineWithButton>
        <FormField>
          <span class="text-[13px] font-bold mb-[6px]">
            ФИО {{ checkChange("name", false) }}
          </span>
          <FormControl
            v-model="form.name"
            placeholder="ФИО"
            required
            name="fio"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Email {{ checkChange("login", false) }}
          </span>
          <FormControl
            v-model="form.login"
            placeholder="Email"
            required
            name="email"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]"> Пароль </span>
          <FormControl
            v-model="form.password"
            placeholder="Пароль"
            required
            type="password"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Права {{ checkChange("type", true) }}
          </span>
          <FormControl
            v-model="form.type"
            placeholder="Права"
            required
            :options="userTypes"
            name="role"
            type="text"
          />
          <BaseButton
            type="submit"
            label="Сохранить изменения"
            :icon="mdiCheck"
            color="success"
          />
        </FormField>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { mdiPen, mdiCheck } from "@mdi/js";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import BaseButton from "@/components/BaseButton.vue";
import md5 from "md5";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const userStore = useUserStore();

const userId = computed(() => Number(router.currentRoute.value.params.userId));

const editingUser = computed(() => userStore.allUsers[0]);

onMounted(async () => {
  await userStore.getUserById(userId.value);
  form.value.login = editingUser.value.login;
  form.value.name = editingUser.value.name;
  form.value.type =
    userTypes.find((option) => option.value === editingUser.value.type) ?? {};
});

const form = ref({
  login: "",
  name: "",
  password: "",
  type: {},
});

const userTypes = reactive([
  {
    label: "Администратор",
    value: "ADMIN",
  },
  {
    label: "Сотрудник",
    value: "VIEWER",
  },
]);

const checkChange = (field: string, isOptions?: boolean) => {
  if (isOptions) {
    if (form.value.type.value !== editingUser.value.type) {
      return "(изменено)";
    }
    return;
  }

  if (form.value[field] !== editingUser.value[field]) {
    return "(изменено)";
  }
};

const submit = () => {
  const changedData = {
    id: editingUser.value.id,
    password: md5(form.value.password.trim() ?? editingUser.value.password),
    name: form.value.name,
    login: form.value.login,
    type: form.value.type.value,
  };

  userStore
    .editUser(changedData)
    .then(() => {
      ElNotification({
        type: "success",
        duration: 1500,
        showClose: true,
        message: "Пользователь успешно изменен",
      });
    })
    .catch((error) => {
      ElNotification({
        type: "error",
        duration: 1500,
        showClose: true,
        message: "Ошибка изменения",
      });
    });
};
</script>
