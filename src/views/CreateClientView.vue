<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent="submit">
        <SectionTitleLineWithButton title="Данные клиента">
          <span />
        </SectionTitleLineWithButton>
        <FormField>
          <FormControl
            v-model="form.fio"
            placeholder="ФИО"
            required
            name="fio"
            type="text"
          />
          <FormControl
            v-model="form.inn"
            placeholder="ИНН"
            required
            name="inn"
            type="text"
          />
          <FormControl
            v-model="selectedClientOption"
            :options="clientOptions"
            required
            name="clientOption"
            type="text"
          />
          <FormControl
            v-model="form.phone"
            placeholder="Номер телефона"
            required
            name="phone"
            type="text"
          />
          <FormControl
            v-model="form.email"
            placeholder="Email"
            name="email"
            type="text"
          />
        </FormField>
        <SectionTitleLineWithButton title="Данные организации">
          <span />
        </SectionTitleLineWithButton>
        <FormField>
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
          />
          <FormControl
            v-model="form.kpp"
            placeholder="КПП"
            required
            name="kpp"
            type="text"
          />
          <FormControl
            v-model="form.ogrn"
            placeholder="ОГРН"
            required
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
          <FormControl
            v-model="selectedTaxesOption"
            :options="formattedTaxes"
            required
            name="taxes"
            type="text"
          />
        </FormField>
        <BaseButton
          type="submit"
          class="mt-[10px]"
          color="success"
          :icon="mdiCheck"
          label="Создать клиета"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup>
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref, watch } from "vue";
import { mdiCheck } from "@mdi/js";
import { computed } from "@vue/reactivity";
import { useUserStore } from "@/stores/user";
import { useClientStore } from "@/stores/clients";

const form = ref({
  fio: "",
  inn: "",
  phone: "",
  email: "",
  name: "",
  orgInn: "",
  kpp: "",
  ogrn: "",
  physicalAdress: "",
  jurAdress: "",
  position: "",
});

const userStore = useUserStore();
const user = computed(() => {
  return userStore.user;
});

const clientStore = useClientStore();

const submit = async () => {
  const clientData = {
    name: form.value.fio,
    inn: form.value.inn,
    phone: form.value.phone,
    email: form.value.email,
    type: selectedClientOption.value.value,
  };

  const client = await clientStore.createClient(clientData);
  const organizationData = {
    name: form.value.name,
    organizationInn: form.value.orgInn,
    organizationKpp: form.value.kpp,
    organizationOgrn: form.value.ogrn,
    ownerPosition: form.value.position,
    organizationJuridicalAddress: form.value.jurAdress,
    organizationPhysicalAddress: form.value.physicalAdress,
    inspectionId: user.value.inspectionId,
    taxesTypeId: selectedTaxesOption.value.id,
    clientId: client.id,
  };
  await clientStore.createOrganization(organizationData);
};

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

const taxesOptions = [
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
    id: 6,
    label: "УСН ДОХОДЫ МИНУС РАСХОДЫ ИП",
    value: "USN_INCOMING_MINUS_IP",
    bid: 15,
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
];

const formattedTaxes = computed(() => {
  if (selectedClientOption.value.value.includes("UL")) {
    return taxesOptions.filter(
      (option) => option.value.includes("UL") || !option.value.includes("IP")
    );
  } else if (selectedClientOption.value.value.includes("IP")) {
    return taxesOptions.filter(
      (option) => option.value.includes("IP") || !option.value.includes("UL")
    );
  } else {
    return taxesOptions.filter(
      (option) => !option.value.includes("IP") && !option.value.includes("UL")
    );
  }
});

const selectedClientOption = ref(clientOptions[0]);
const selectedTaxesOption = ref(formattedTaxes.value[0]);

watch(formattedTaxes, () => {
  selectedTaxesOption.value = formattedTaxes.value[0];
});
</script>
