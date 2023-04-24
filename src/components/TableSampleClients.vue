<template>
  <CardBoxModal
    v-model="isModalDangerActive"
    title="Подтверждение удаления"
    button="danger"
    button-label="Подтвердить"
    has-cancel
    @confirm="deleteClient"
  >
    <p>Вы уверены, что хотите удалить клиента?</p>
  </CardBoxModal>

  <CardBoxComponentEmpty v-if="!clients.length">
    <div
      class="m-[10px] mx-auto items-center flex-col justify-center cursor-pointer flex w-[200px] px-[15px] py-[6px] rounded-[6px]"
    >
      <span class="mb-[10px]">Клиентов нет</span>
      <RouterLink to="/createClient">
        <BaseButton color="info" :icon="mdiPlus" :label="'Добавить клиента'" />
      </RouterLink>
    </div>
  </CardBoxComponentEmpty>

  <div v-if="clients.length">
    <div
      class="m-[10px] cursor-pointer flex w-[200px] px-[15px] py-[6px] rounded-[6px]"
    >
      <RouterLink to="/createClient">
        <BaseButton color="info" :icon="mdiPlus" :label="'Добавить клиента'" />
      </RouterLink>
      <input
        class="mx-[10px] bg-transparent rounded-[6px]"
        v-model="filterRequest"
        type="text"
        placeholder="Введите данные"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>ИНН</th>
          <th>Тип</th>
          <th>Задолженности</th>
          <th>Кол-во организаций</th>
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
              :title="client.clientType"
              >{{ client.inn }}</small
            >
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
              findClientOwe(client.id)
            }}</small>
          </td>
          <td data-label="Кол-во организаций" class="lg:w-1 whitespace-nowrap">
            <small
              class="text-gray-500 dark:text-slate-400"
              :title="client.organizations.length"
              >{{ client.organizations.length }}</small
            >
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="mdiEye"
                small
                @click="viewClientDetails(client.id)"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="showDeleteModal(client.id)"
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
      <span class="mb-[10px]">Клиентов с такими данными нет</span>
    </div>
  </CardBoxComponentEmpty>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiEye, mdiTrashCan, mdiPlus } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
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

const filteredClients = computed(() => {
  return clients.value.filter(
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

const deleteClient = () => {
  clientStore.deleteClient(clientIdToDelete.value).then(() => {
    ElNotification({
      message: "Клиент успешно удален",
      duration: 3500,
      type: "success",
      showClose: true,
    });
  });
};

const findClientOwe = (clientId) => {
  const clientIndex = filteredClients.value.findIndex(
    (client) => client.id === clientId
  );
  if (clientIndex === -1) return;
  const clearedClients = filteredClients.value[clientIndex].TaxesPayment.filter(
    (payment) =>
      new Date(payment.nextPaymentDate).getTime() < new Date().getTime()
  );

  if (clearedClients.length) {
    return "Да";
  } else {
    return "Нет";
  }
};

onMounted(async () => {
  await clientStore.getClientsByInspectionId(user.value.inspectionId);
});

const viewClientDetails = (clientId) => {
  router.push(`/clientDetails/${clientId}`);
};

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
