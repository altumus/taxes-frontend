<template>
  <LayoutAuthenticated>
    <CardBoxModal
      v-model="isDeleteModalActive"
      title="Подтверждение удаления"
      button="danger"
      buttonLabel="Подтвердить"
      has-cancel
      @confirm="confirmUserDelete"
    >
      <p>Вы уверены, что хотите удалить сотрудника?</p>
    </CardBoxModal>
    <SectionMain>
      <SectionTitleLineWithButton title="Сотрудники организации">
        <span />
      </SectionTitleLineWithButton>
      <h2 class="my-[10px]">
        {{ currentUser.inspectionName }} ({{ currentUser.inspectionCode }})
      </h2>

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
          class="w-full"
          @click="createClient"
          :color="startCreate ? 'success' : 'info'"
          :icon="startCreate ? mdiPlus : ''"
          :label="
            startCreate ? 'Добавить пользователя' : 'Открыть панель создания'
          "
        />
        <BaseButton
          v-if="startCreate"
          class="w-full mt-[10px]"
          @click="cancelCreate"
          color="danger"
          :icon="mdiClose"
          label="Отменить создание"
        />
      </CardBox>
      <CardBox>
        <div
          class="m-[10px] w-full flex flex-col lg:justify-between py-[6px] rounded-[6px]"
        >
          <table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Логин</th>
                <th>Права</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in itemsPaginated">
                <td data-label="ФИО" class="lg:w-1 whitespace-nowrap">
                  {{ user.name }}
                </td>
                <td data-label="Логин" class="lg:w-1 whitespace-nowrap">
                  {{ user.login }}
                </td>
                <td data-label="Права" class="lg:w-1 whitespace-nowrap">
                  {{ localizePosition(user.type) }}
                </td>
                <td class="before:hidden lg:w-1 whitespace-nowrap">
                  <BaseButtons type="justify-start lg:justify-end" no-wrap>
                    <BaseButton
                      v-if="user.id !== currentUser.id"
                      color="danger"
                      :icon="mdiTrashCan"
                      small
                      @click="showDeleteModal(user.id)"
                    />
                    <span class="justify-start lg:justify-end" v-else>
                      (Вы)
                    </span>
                  </BaseButtons>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            v-if="pagesList.length"
            class="p-3 lg:p-0 lg:mt-[10px] border-t border-gray-100 dark:border-slate-800"
          >
            <BaseLevel>
              <BaseButtons>
                <BaseButton
                  v-for="page in pagesList"
                  :key="page"
                  :active="page === currentPage"
                  :label="page + 1"
                  :color="page === currentPage ? 'lightDark' : 'whiteDark'"
                  small
                  @click="currentPage = page"
                />
              </BaseButtons>
              <small>Страница {{ currentPageHuman }} из {{ numPages }}</small>
            </BaseLevel>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import md5 from "md5";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
import { mdiPlus, mdiClose, mdiTrashCan } from "@mdi/js";
import { localizePosition } from "@/js/helpers/localization.js";
import { ref, computed, reactive, onMounted } from "vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import BaseLevel from "@/components/BaseLevel.vue";
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

onMounted(async () => {
  await userStore.getAllUsers(currentUser.value.inspectionId);
});

const allUsers = computed(() => {
  return userStore.allUsers;
});

const isDeleteModalActive = ref(false);

const userToDelete = ref(0);

const showDeleteModal = (userId: number) => {
  isDeleteModalActive.value = true;
  userToDelete.value = userId;
};

const confirmUserDelete = () => {
  userStore.deleteUser(userToDelete.value);
  userToDelete.value = 0;
};

const perPage = ref(5);

const currentPage = ref(0);

const itemsPaginated = computed(() => {
  return allUsers.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  );
});

const numPages = computed(() => {
  return Math.ceil(allUsers.value.length / perPage.value);
});

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
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

const clearForm = () => {
  const keys = Object.keys(userForm.value);
  for (let i = 1; i < keys.length - 1; i++) {
    userForm.value[keys[i]] = "";
  }
  userForm.value.type = userTypeOptions[0];
};

const cancelCreate = () => {
  startCreate.value = false;
  clearForm();
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

  clearForm();
};
</script>
