<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Сотрудники организации">
        <span />
      </SectionTitleLineWithButton>

      <CardBox class="gap-[6px] mb-[10px]">
        <FormField v-if="startCreate" @submit.prevent>
          <FormControl
            v-model="userForm.name"
            placeholder="ФИО"
            required
            type="text"
          />
          <FormControl
            v-model="userForm.login"
            placeholder="Логин"
            required
            type="text"
          />
          <FormControl
            v-model="userForm.password"
            placeholder="Пароль"
            required
            type="password"
          />
          <FormControl v-model="userForm.type" :options="userTypeOptions" />
        </FormField>
        <BaseButton
          @click="createClient"
          :color="startCreate ? 'success' : 'info'"
          :icon="startCreate ? mdiPlus : ''"
          :label="
            startCreate ? 'Добавить пользователя' : 'Открыть панель создания'
          "
        />
      </CardBox>

      <CardBox>
        <div class="grid grid-cols-1 gap-6 mb-6 max-h-[50vh] overflow-y-auto">
          <CardBox>
            <span>test</span>
          </CardBox>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import md5 from "md5";
import BaseButton from "@/components/BaseButton.vue";
import { mdiPlus } from "@mdi/js";
import { ref, computed, reactive } from "vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";
import { useUserStore } from "@/stores/user";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const userStore = useUserStore();

const currentUser = computed(() => {
  return userStore.user;
});

const userTypeOptions = reactive(["Сотрудник", "Администратор"]);

const userForm = ref({
  inspectionId: currentUser.value.inspectionId,
  login: "",
  name: "",
  password: "",
  type: "Сотрудник",
});

const startCreate = ref(false);

const parseUserType = (type: string) => {
  if (type === "Администратор") {
    return "ADMIN";
  }

  return "VIEWER";
};

const createClient = async () => {
  if (!startCreate.value) {
    startCreate.value = true;
    return;
  }
  // убираем лишние пробелы
  userForm.value.login.trim();
  userForm.value.name.trim();
  userForm.value.password.trim();

  const checkUser = await userStore.checkUser(userForm.value.login);

  if (checkUser) {
    ElNotification({
      message: "Такой пользователь уже существует",
      duration: 5500,
      showClose: true,
      type: "error",
    });
    return;
  }

  userForm.value.password = md5(userForm.value.password);
  userForm.value.type = parseUserType(userForm.value.type);
  await userStore.addUser(userForm.value);
  ElNotification({
    message: "Пользователь успешно добавлен",
    duration: 2500,
    showClose: true,
    type: "success",
  });

  // обнуление формы
  const keys = Object.keys(userForm.value);
  for (let i = 1; i < keys.length - 1; i++) {
    userForm.value[keys[i]] = "";
  }
  userForm.value.type = userTypeOptions[0];
};
</script>
