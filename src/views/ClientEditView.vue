<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent>
        <SectionTitleLineWithButton
          title="Изменение контрагента"
          :icon="mdiPen"
        >
          <span />
        </SectionTitleLineWithButton>
        <FormField>
          <span>ФИО {{ checkChange("name", false) }}</span>
          <FormControl
            v-model="form.name"
            placeholder="ФИО"
            required
            name="fio"
            type="text"
          />
          <span>ИНН {{ checkChange("inn", false) }}</span>
          <FormControl
            v-model="form.inn"
            placeholder="ИНН"
            required
            name="inn"
            type="text"
          />
          <span>Тип {{ checkChange("clientType", true) }}</span>
          <FormControl
            v-model="form.clientType"
            :options="clientOptions"
            name="clientOptions"
            type="text"
          />
          <span>Телефон {{ checkChange("phone", false) }}</span>
          <FormControl
            v-model="form.phone"
            placeholder="Номер телефона"
            required
            name="phone"
            type="text"
          />
          <span>Email {{ checkChange("email", false) }}</span>
          <FormControl
            v-model="form.email"
            placeholder="Email"
            name="email"
            type="text"
          />
        </FormField>
        <BaseButton
          type="submit"
          color="success"
          :icon="mdiCheck"
          label="Изменить клиента"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import router from "@/router";
import { useClientStore } from "@/stores/clients";
import { useUserStore } from "@/stores/user";
import { mdiPen, mdiCheck } from "@mdi/js";
import { computed, ref, onMounted } from "vue";

import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import BaseButton from "@/components/BaseButton.vue";

const clientStore = useClientStore();
const userStore = useUserStore();

const clientId = computed(() =>
  Number(router.currentRoute.value.params.clientId)
);
const inspectionId = computed(() => userStore.user.inspectionId);

const client = computed(() => clientStore.clients[0]);

onMounted(async () => {
  await clientStore.getClientInfo(inspectionId.value, clientId.value);
  form.value.name = client.value.name;
  form.value.inn = client.value.inn;
  form.value.phone = client.value.phone;
  form.value.email = client.value.email;
  form.value.clientType =
    clientOptions.find((option) => option.value === client.value.clientType) ??
    {};
  form.value.isArchived = client.value.isArchived;
});

const form = ref({
  name: "",
  inn: "",
  phone: "",
  email: "",
  clientType: {},
  isArchived: false,
});

const clientOptions = [
  {
    id: 1,
    label: "ИП",
    value: "IP",
  },
  {
    id: 2,
    label: "Юрдическое лицо",
    value: "UL",
  },
  {
    id: 3,
    label: "Самозанятый",
    value: "SE",
  },
];

const checkChange = (field: string, isOptions: boolean) => {
  if (!client.value) return;

  if (isOptions) {
    if (form.value[field].value !== client.value.clientType) {
      return "(изменено)";
    }
    return;
  }

  if (form.value[field] !== client.value[field]) {
    return "(изменено)";
  }
};
</script>
