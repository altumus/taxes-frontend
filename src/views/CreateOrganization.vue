<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent="createOrganization">
        <SectionTitleLineWithButton title="Данные организации">
          <span />
        </SectionTitleLineWithButton>
        <FormField>
          <span>Выберите контрагента</span>
          <FormControl
            required
            placeholder="Выберите контрагента"
            v-model="form.client"
            :options="clientsOptions"
          />
          <FormControl
            v-model="form.name"
            placeholder="Название организации"
            required
            name="name"
            type="text"
          />
          <FormControl
            v-model="form.orgInn"
            placeholder="ИНН"
            required
            name="orgInn"
            type="text"
            maxlength="10"
          />
          <FormControl
            v-model="form.kpp"
            placeholder="КПП"
            required
            name="kpp"
            type="text"
            maxlength="9"
          />
          <FormControl
            v-model="form.ogrn"
            placeholder="ОГРН"
            required
            maxlength="13"
            name="ogrn"
            type="text"
          />
          <FormControl
            v-model="form.physicalAdress"
            placeholder="Физический адрес"
            required
            name="physicalAdress"
            type="text"
          />
          <FormControl
            v-model="form.jurAdress"
            placeholder="Юрдический адрес"
            required
            name="JurAdress"
            type="text"
          />
          <FormControl
            v-model="form.position"
            placeholder="Должность руководителя"
            required
            name="position"
            type="text"
          />
          <span v-if="form.client.length">Выберите тип налогообложения</span>
          <FormControl
            v-if="form.client.length"
            v-model="form.taxes"
            :options="formattedTaxes"
            required
            name="taxes"
          />
          <BaseButton
            type="submit"
            color="success"
            label="Создать организацию"
            :icon="mdiCheck"
          />
        </FormField>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import { mdiCheck } from "@mdi/js";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { useClientStore } from "@/stores/clients";
import { useUserStore } from "@/stores/user";
import { localizeClientType } from "@/js/helpers/localization.js";
import BaseButton from "@/components/BaseButton.vue";
import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const clientStore = useClientStore();

const userStore = useUserStore();

const clients = computed(() => {
  return clientStore.clients;
});

const currentUser = computed(() => {
  return userStore.user;
});

onMounted(async () => {
  await clientStore.getClientsByInspectionId(currentUser.value.inspectionId);
});

const clientsOptions = computed(() => {
  const formattedClients = clients.value.map(
    (client) =>
      `${client.name} - ${client.inn} - ${localizeClientType(
        client.clientType
      )}`
  );
  console.log("formatted", formattedClients);
  return formattedClients;
});

const taxesOptions = reactive([
  {
    id: 1,
    label: "УСН ДОХОДЫ ИП",
    value: "USN_INCOMING_IP",
    bid: 6,
  },
  {
    id: 2,
    label: "УСН ДОХОДЫ МИНУС РАСХОДЫ ИП",
    value: "USN_INCOMING_MINUS_IP",
    bid: 15,
  },
  {
    id: 3,
    label: "ПСН",
    value: "PSN",
    bid: 6,
  },
  {
    id: 4,
    label: "НПМ",
    value: "NPM",
    bid: 4,
  },
  {
    id: 5,
    label: "УСН РАСХОДЫ ЮР.ЛИЦО",
    value: "USN_INCOMING_UL",
    bid: 6,
  },
  {
    id: 7,
    label: "ОРН ИП",
    value: "ORN_IP",
    bid: 13,
  },
  {
    id: 8,
    label: "ОРН ЮР.ЛИЦО",
    value: "ORN_UL",
    bid: 20,
  },
]);

const client = computed(() => {
  if (!form.value.client?.length) return;
  const firstIndex = form.value.client.indexOf("-");
  const lastIndex = form.value.client.lastIndexOf("-");
  const clientInn = form.value.client.slice(firstIndex + 1, lastIndex).trim();

  const client = clients.value.find((client) => client.inn === clientInn);

  return client;
});

const formattedTaxes = computed(() => {
  if (client.value?.clientType.includes("UL")) {
    return taxesOptions.filter(
      (option) => option.value.includes("UL") || !option.value.includes("IP")
    );
  } else if (client.value?.clientType.includes("IP")) {
    return taxesOptions.filter(
      (option) => option.value.includes("IP") || !option.value.includes("UL")
    );
  } else {
    return taxesOptions.filter(
      (option) => !option.value.includes("IP") && !option.value.includes("UL")
    );
  }
});

const form = ref({
  client: "",
  name: "",
  orgInn: "",
  kpp: "",
  ogrn: "",
  physicalAdress: "",
  jurAdress: "",
  position: "",
  taxes: "",
});

const clearForm = () => {
  const formKeys = Object.keys(form.value);
  for (let i = 0; i < formKeys.length; i++) {
    form.value[formKeys[i]] = "";
  }
};

const createOrganization = async () => {
  if (!form.value.taxes || !client.value) {
    ElNotification({
      message: "Во время создания произошла ошибка, проверьте поля",
      duration: 3500,
      type: "error",
      showClose: true,
    });
    return;
  }

  // проверка на заполненность полей
  const formKeys = Object.keys(form.value);
  for (let i = 0; i < formKeys.length - 1; i++) {
    form.value[formKeys[i]] = form.value[formKeys[i]].trim();
    if (!form.value[formKeys[i]].length) {
      alert(`not filled ${formKeys[i]}`);
      return;
    }
  }

  if (typeof form.value.taxes === "string") {
    ElNotification({
      message: "Во время создания произошла ошибка, проверьте поля",
      duration: 3500,
      type: "error",
      showClose: true,
    });
    return;
  }

  const selectedTax = computed(() => {
    return taxesOptions.find(
      (option) => option.label === form.value.taxes?.label
    );
  });

  if (!selectedTax.value) {
    ElNotification({
      message: "Во время создания произошла ошибка, проверьте поля",
      duration: 3500,
      type: "error",
      showClose: true,
    });
    return;
  }

  const organizationData = {
    name: form.value.name,
    organizationInn: form.value.orgInn,
    organizationKpp: form.value.kpp,
    organizationOgrn: form.value.ogrn,
    ownerPosition: form.value.position,
    organizationJuridicalAddress: form.value.jurAdress,
    organizationPhysicalAddress: form.value.physicalAdress,
    inspectionId: currentUser.value.inspectionId,
    taxesTypeId: selectedTax.value.id,
    clientId: client.value.id,
  };

  const orgnanization = await clientStore.createOrganization(organizationData);
  if (orgnanization?.status === "created") {
    ElNotification({
      message: "Организация успешно создана",
      duration: 3500,
      type: "success",
      showClose: true,
    });
  } else {
    ElNotification({
      message: "Такая организация уже существует",
      duration: 3500,
      type: "error",
      showClose: true,
    });
  }
  clearForm();
};
</script>
