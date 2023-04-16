<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
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

  <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-800">
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>
  <div v-if="clients.length">
    <div
      class="m-[10px] cursor-pointer flex w-[200px] px-[15px] py-[6px] rounded-[6px]"
    >
      <RouterLink to="/createClient">
        <BaseButton color="info" :icon="mdiPlus" :label="'Добавить клиента'" />
      </RouterLink>
    </div>
    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th>Клиент</th>
          <th>Телефон</th>
          <th>Тип</th>
          <th>Задолженности</th>
          <th>Кол-во организаций</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in itemsPaginated" :key="client.id">
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, client)"
          />

          <td data-label="fio">
            {{ client.name }}
          </td>
          <td data-label="phone">
            {{ client.phone }}
          </td>
          <td data-label="type" class="lg:w-1 whitespace-nowrap">
            <small
              class="text-gray-500 dark:text-slate-400"
              :title="client.clientType"
              >{{ localizeClientType(client.clientType) }}</small
            >
          </td>
          <td data-label="Created" class="lg:w-1 whitespace-nowrap">
            <small
              class="text-gray-500 dark:text-slate-400"
              :title="client.created"
              >{{ client.created }}</small
            >
          </td>
          <td data-label="count" class="lg:w-1 whitespace-nowrap">
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
                @click="isModalActive = true"
              />
              <BaseButton
                color="danger"
                :icon="mdiTrashCan"
                small
                @click="isModalDangerActive = true"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
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
import { localizeClientType } from "@/js/helpers/localization.js";
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/clients";

defineProps({
  checkable: Boolean,
});

const userStore = useUserStore();

const user = computed(() => {
  return userStore.user;
});

const clientStore = useClientStore();

const clients = computed(() => {
  return clientStore.clients;
});

onMounted(() => {
  clientStore.getClientsByInspectionId(user.value.inspectionId);
});

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

const itemsPaginated = computed(() =>
  clients.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(clients.value.length / perPage.value)
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
