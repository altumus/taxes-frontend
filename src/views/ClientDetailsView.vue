<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Информация о клиенте">
        <span />
      </SectionTitleLineWithButton>
      <CardBox>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ФИО </span>
              <span class="text-lg">
                {{ client?.name }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ИНН </span>
              <span class="text-lg">
                {{ client?.inn }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Тип клиента </span>
              <span class="text-lg">
                {{ localizeClientType(client?.clientType) }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Email </span>
              <span class="text-lg">
                {{ client?.email ? client.email : "Отсутствует" }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Телефон </span>
              <span class="text-lg">
                {{ client?.phone }}
              </span>
            </div>
          </CardBox>
        </div>
      </CardBox>
      <SectionTitleLineWithButton title="Информация об организациях">
        <span />
      </SectionTitleLineWithButton>
      <CardBox v-for="organization in client?.organizations">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Название </span>
              <span class="text-lg">
                {{ organization.name }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ИНН </span>
              <span class="text-lg">
                {{ organization.organizationInn }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> КПП </span>
              <span class="text-lg">
                {{ organization.organizationKpp }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> ОГРН </span>
              <span class="text-lg">
                {{ organization.organizationOgrn }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Физический адрес </span>
              <span class="text-lg">
                {{ organization.organizationPhysicalAddress }}
              </span>
            </div>
          </CardBox>
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]"> Юрдический адрес </span>
              <span class="text-lg">
                {{ organization.organizationJuridicalAddress }}
              </span>
            </div>
          </CardBox>
        </div>
        <div class="grid grid-cols-1 gap-6 mb-6">
          <CardBox>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[13px]">
                Должность руководителя
              </span>
              <span class="text-lg">
                {{ organization.ownerPosition }}
              </span>
            </div>
          </CardBox>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useClientStore } from "@/stores/clients";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { localizeClientType } from "@/js/helpers/localization";

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/CardBox.vue";

const clientsStore = useClientStore();
const userStore = useUserStore();

onMounted(async () => {
  const router = useRouter();

  const inspectionId = computed(() => {
    return userStore.user.inspectionId;
  });

  const clientId = computed(() => {
    return Number(router.currentRoute.value.params.clientId);
  });

  await clientsStore.getClientInfo(inspectionId.value, clientId.value);
});

const client = computed(() => {
  return clientsStore.clients[0];
});

const isClientFound = computed(() => {
  if (!client.value) return false;
  return Object.keys(client.value).length;
});
</script>
