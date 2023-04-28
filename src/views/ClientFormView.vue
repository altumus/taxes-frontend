<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Контрагент">
          <FormControl
            v-model="form.client"
            required
            name="Контрагент"
            :options="formattedClients"
          />
        </FormField>
        <FormField v-if="form.client" label="Организация">
          <FormControl
            v-model="form.organization"
            :options="formattedOrganizations"
            required
            name="orgId"
          />
        </FormField>
        <FormField label="Сумма дохода (₽)">
          <FormControl v-model="form.income" required name="income" />
        </FormField>
        <BaseButton color="info" label="Отправить" type="submit" />
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
<script setup lang="ts">
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useClientStore } from "@/stores/clients";
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { localizeClientType } from "@/js/helpers/localization";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const userStore = useUserStore();
const clientStore = useClientStore();

const currentUser = computed(() => {
  return userStore.user;
});

const allClients = computed(() => {
  return clientStore.clients;
});

const clearForm = () => {
  const formKeys = Object.keys(form.value);
  for (let i = 0; i < formKeys.length; i++) {
    form.value[formKeys[i]] = "";
  }
};

const parsedClient = computed(() => {
  const firstIndex = form.value.client.indexOf("-");
  const lastIndex = form.value.client.lastIndexOf("-");

  const clientInn = form.value.client.slice(firstIndex + 1, lastIndex).trim();

  const client = allClients.value.find((client) => client.inn === clientInn);

  return client;
});

const parsedOrganization = computed(() => {
  const firstIndex = form.value.organization.indexOf("-");

  const organizationInn = form.value.organization
    .slice(firstIndex + 1, form.value.organization.length)
    .trim();

  const organization = parsedClient.value?.organizations.find(
    (organization) => organization.organizationInn === organizationInn
  );
  return organization;
});

const formattedClients = computed(() => {
  return allClients.value.map(
    (client) =>
      `${client.name} - ${client.inn} - ${localizeClientType(
        client.clientType
      )}`
  );
});

const formattedOrganizations = computed(() => {
  return parsedClient.value?.organizations.map(
    (organization) => `${organization.name} - ${organization.organizationInn}`
  );
});

onMounted(async () => {
  await clientStore.getClientsByInspectionId(currentUser.value.inspectionId);
});

const form = ref({
  client: "" as string,
  organization: "" as string,
  income: "" as Number | string,
});

const submit = async () => {
  if (!parsedClient.value || !parsedOrganization.value) {
    ElNotification({
      message: "Проверьте заполнены ли поля",
      duration: 3500,
      type: "error",
      showClose: true,
    });
    return;
  }
  const validate = {
    clientId: parsedClient.value.id,
    organizationId: parsedOrganization.value.id,
    income: Number(form.value.income),
  };
  await clientStore.createPayment(validate);
  ElNotification({
    message: "Оплата прошла успешно",
    duration: 3500,
    type: "success",
    showClose: true,
  });
  clearForm();
};
</script>
