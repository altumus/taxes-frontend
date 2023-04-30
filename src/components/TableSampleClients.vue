<template>
  <CardBoxModal
    v-model="isModalDangerActive"
    title="Подтверждение архивации"
    button="danger"
    button-label="Подтвердить"
    has-cancel
    @confirm="deleteClient"
  >
    <p>Вы уверены, что хотите отправить контрагента в архив?</p>
  </CardBoxModal>

  <CardBoxComponentEmpty v-if="!clients.length">
    <div
      class="m-[10px] mx-auto items-center flex-col justify-center cursor-pointer flex w-[200px] px-[15px] py-[6px] rounded-[6px]"
    >
      <span class="mb-[10px]">Контрагентов нет</span>
      <RouterLink to="/createClient">
        <BaseButton
          color="info"
          :icon="mdiPlus"
          :label="'Добавить контрагента'"
        />
      </RouterLink>
    </div>
  </CardBoxComponentEmpty>
  <div v-if="clients">
    <div v-if="clients.length">
      <div
        class="m-[10px] w-full flex flex-col lg:flex-row lg:justify-between lg:px-[15px] py-[6px] rounded-[6px]"
      >
        <div class="flex flex-col lg:flex-row gap-[5px]">
          <RouterLink class="cursor-pointer" to="/createClient">
            <BaseButton
              class="w-[97%]"
              color="info"
              :icon="mdiPlus"
              :label="'Добавить контрагента'"
            />
          </RouterLink>
          <RouterLink
            v-if="clients.length"
            class="cursor-pointer w-full"
            to="/createOrganization"
          >
            <BaseButton
              class="w-[97%]"
              color="info"
              :icon="mdiPlus"
              :label="'Добавить организацию'"
            />
          </RouterLink>
        </div>

        <div class="flex mt-[10px] lg:mt-0 lg:mr-[20px]">
          <input
            class="lg:mx-[10px] w-[90%] cursor-text bg-transparent rounded-[6px]"
            v-model="filterRequest"
            type="text"
            placeholder="Введите данные"
          />
          <el-dropdown class="flex items-center justify-center" trigger="click">
            <span
              class="focus:outline-none bg-blue-500 px-[13px] py-[10px] rounded-[6px] mx-[10px]"
            >
              <svg
                class="mt-[5px]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Free-Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <g
                    transform="translate(-155.000000, -381.000000)"
                    id="Group"
                    stroke="white"
                    stroke-width="2"
                  >
                    <g transform="translate(153.000000, 376.000000)" id="Shape">
                      <path d="M6,12 L18,12 M9,18 L15,18 M3,6 L21,6"></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :class="option.selected ? 'bg-gray-200' : ''"
                  @click.prevent="selectOption(index)"
                  :key="index"
                  v-for="(option, index) in filterOptions"
                >
                  {{ option.label }}
                </el-dropdown-item>
                <el-dropdown-item @click="resetFilters" divided>
                  Сбросить фильтры
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Телефон</th>
            <th>ИНН</th>
            <th>Тип</th>
            <th>Задолженности</th>
            <th>Организации</th>
            <th>Активен</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in itemsPaginated" :key="client.id">
            <td data-label="ФИО">
              {{ client.name }}
            </td>
            <td data-label="Телефон">
              {{ client.phone }}
            </td>
            <td data-label="ИНН" class="lg:w-1 whitespace-nowrap">
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.inn"
                >{{ client.inn }}
              </small>
            </td>
            <td data-label="Тип" class="lg:w-1 whitespace-nowrap">
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.clientType"
                >{{ localizeClientType(client.clientType) }}</small
              >
            </td>
            <td data-label="Задолженности" class="lg:w-1 whitespace-nowrap">
              <small class="text-gray-500 dark:text-slate-400">{{
                client.haveOwe ? "Да" : "Нет"
              }}</small>
            </td>
            <td
              data-label="Кол-во организаций"
              class="lg:w-1 whitespace-nowrap"
            >
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.organizations.length"
                >{{ client.organizations.length }}</small
              >
            </td>
            <td data-label="Активен" class="lg:w-1 whitespace-nowrap">
              <small
                class="text-gray-500 dark:text-slate-400"
                :title="client.isArchived"
                >{{ client.isArchived ? "Нет" : "Да" }}</small
              >
            </td>
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <BaseButtons type="justify-start lg:justify-end" no-wrap>
                <BaseButton
                  color="info"
                  :icon="mdiEye"
                  small
                  :href="`/clientDetails/${client.id}`"
                />
                <BaseButton
                  color="warning"
                  :icon="mdiPen"
                  :href="`/editClient/${client.id}`"
                  small
                />
                <BaseButton
                  color="danger"
                  :icon="mdiTrashCan"
                  small
                  @click="showDeleteModal(client.id)"
                />
                <BaseButton
                  v-if="client.isArchived"
                  color="success"
                  :icon="mdiArrowLeft"
                  small
                  @click="returnClient(client.id)"
                />
              </BaseButtons>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="pagesList.length"
        class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
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
    <CardBoxComponentEmpty v-if="!filteredClients.length && clients.length">
      <div
        class="m-[10px] mx-auto items-center flex-col justify-center cursor-pointer flex w-[200px] px-[15px] py-[6px] rounded-[6px]"
      >
        <span class="mb-[10px]">Контрагентов с такими данными нет</span>
      </div>
    </CardBoxComponentEmpty>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { mdiEye, mdiTrashCan, mdiPlus, mdiArrowLeft, mdiPen } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { localizeClientType } from "@/js/helpers/localization";
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/clients";
import router from "@/router";
import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

defineProps({
  checkable: Boolean,
});

const userStore = useUserStore();

const filterRequest = ref("");

const filterOptions = ref([
  {
    label: "ИП",
    value: "IP",
    selected: false,
    unique: true,
    key: "clientType",
  },
  {
    label: "Юр.Лицо",
    value: "UL",
    selected: false,
    unique: true,
    key: "clientType",
  },
  {
    label: "Самозанятый",
    value: "SE",
    selected: false,
    unique: true,
    key: "clientType",
  },
  {
    label: "Задолженности",
    value: "OWE",
    selected: false,
    key: "haveOwe",
  },
  {
    label: "Архив",
    value: "ARCHIVE",
    selected: false,
    key: "isArchived",
  },
]);

const selectOption = (optionIndex) => {
  if (optionIndex < 3) {
    for (let i = 0; i < 3; i++) {
      if (optionIndex !== i) {
        filterOptions.value[i].selected = false;
      } else {
        filterOptions.value[i].selected = !filterOptions.value[i].selected;
      }
    }
  } else {
    filterOptions.value[optionIndex].selected =
      !filterOptions.value[optionIndex].selected;
  }
};

const resetFilters = () => {
  for (let i = 0; i < filterOptions.value.length; i++) {
    filterOptions.value[i].selected = false;
  }
};

const filteredClients = computed(() => {
  if (!clients.value) return [];
  const selectedFilters = filterOptions.value.filter(
    (option) => option.selected
  );
  let selectedClients = clients.value;
  if (selectedFilters.length) {
    for (let i = 0; i < selectedFilters.length; i++) {
      if (selectedFilters[i].value === "ARCHIVE") {
        selectedClients = selectedClients.filter(
          (client) =>
            client[selectedFilters[i].key] === selectedFilters[i].selected
        );
      } else {
        selectedClients = selectedClients.filter(
          (client) =>
            client[selectedFilters[i].key] === selectedFilters[i].value
        );
      }
    }
  }
  return selectedClients.filter(
    (client) =>
      client.clientType
        .toLowerCase()
        .includes(filterRequest.value.toLocaleLowerCase()) ||
      client.email.toLowerCase().includes(filterRequest.value.toLowerCase()) ||
      client.name.toLowerCase().includes(filterRequest.value.toLowerCase()) ||
      client.inn.toLowerCase().includes(filterRequest.value.toLowerCase()) ||
      client.phone.toLowerCase().includes(filterRequest.value.toLowerCase()) ||
      localizeClientType(client.clientType)
        .toLowerCase()
        .includes(filterRequest.value.toLowerCase())
  );
});

const user = computed(() => {
  return userStore.user;
});

const clientStore = useClientStore();

const clients = computed(() => {
  return clientStore.clients;
});

const clientIdToDelete = ref(null);

const showDeleteModal = (clientId) => {
  clientIdToDelete.value = clientId;
  isModalDangerActive.value = true;
};

const returnClient = async (clientId) => {
  await clientStore.returnClient(clientId);
  ElNotification({
    type: "success",
    duration: 1500,
    showClose: true,
    message: "Контрагент успешно возвращен из архива",
  });
};

const deleteClient = () => {
  clientStore.deleteClient(clientIdToDelete.value).then(() => {
    ElNotification({
      message: "Контрагент отправлен в архив",
      duration: 3500,
      type: "success",
      showClose: true,
    });
  });
};

onMounted(async () => {
  await clientStore.getClientsByInspectionId(user.value.inspectionId);
});

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  filteredClients.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(filteredClients.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === client.id
    );
  }
};
</script>
