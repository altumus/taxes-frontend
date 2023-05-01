<template>
  <LayoutAuthenticated>
    <SectionMain v-if="client">
      <div class="grid grid-cols-3 gap-6 mb-6">
        <CardBox>
          <div class="text-[13px] font-bold mb-[6px]">Владелец</div>
          <div>{{ client.name }}</div>
        </CardBox>
        <CardBox>
          <div class="text-[13px] font-bold mb-[6px]">ИНН владельца</div>
          <span>{{ client.inn }}</span>
        </CardBox>
        <CardBox>
          <div class="text-[13px] font-bold mb-[6px]">Название организации</div>
          <span>{{ client.organizations[0].name }}</span>
        </CardBox>
      </div>
      <CardBox is-form @submit.prevent="submit">
        <SectionTitleLineWithButton
          title="Изменение организации"
          :icon="mdiPen"
        >
          <span />
        </SectionTitleLineWithButton>
        <FormField>
          <span class="text-[13px] font-bold mb-[6px]">
            Название организации {{ checkChange("name", false) }}
          </span>
          <FormControl
            v-model="form.name"
            placeholder="Название организации"
            required
            name="name"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            ИНН {{ checkChange("organizationInn", false) }}
          </span>
          <FormControl
            v-model="form.organizationInn"
            placeholder="ИНН"
            required
            name="inn"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            КПП {{ checkChange("organizationKpp", false) }}
          </span>
          <FormControl
            v-model="form.organizationKpp"
            placeholder="КПП"
            required
            name="kpp"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            ОГРН {{ checkChange("organizationOgrn", false) }}
          </span>
          <FormControl
            v-model="form.organizationOgrn"
            placeholder="ОГРН"
            required
            name="ogrn"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Физический адрес
            {{ checkChange("organizationPhysicalAddress", false) }}
          </span>
          <FormControl
            v-model="form.organizationPhysicalAddress"
            placeholder="Физический адрес"
            required
            name="physaddress"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Юридический адрес
            {{ checkChange("organizationJuridicalAddress", false) }}
          </span>
          <FormControl
            v-model="form.organizationJuridicalAddress"
            placeholder="Юридический адрес"
            required
            name="juraddress"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Должность руководителя {{ checkChange("ownerPosition", false) }}
          </span>
          <FormControl
            v-model="form.ownerPosition"
            placeholder="Должность руководителя"
            required
            name="ownerposition"
            type="text"
          />
          <span class="text-[13px] font-bold mb-[6px]">
            Тип налогообложения {{ checkChange("taxesType", true) }}
          </span>
          <FormControl
            v-model="form.taxesType"
            :options="taxesOptions"
            placeholder="Должность руководителя"
            required
            name="ownerposition"
            type="text"
          />
        </FormField>
        <BaseButton
          class="w-full"
          type="submit"
          color="success"
          :icon="mdiCheck"
          label="Сохранить изменения"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script setup lang="ts">
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import { mdiPen, mdiCheck } from "@mdi/js";
import { useClientStore } from "@/stores/clients";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import { computed, onMounted, ref, reactive } from "vue";
import BaseButton from "@/components/BaseButton.vue";

import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";

const clientStore = useClientStore();
const userStore = useUserStore();

const inspectionId = computed(() => userStore.user.inspectionId);
const clientId = computed(() =>
  Number(router.currentRoute.value.params.clientId)
);
const organizationId = computed(() =>
  Number(router.currentRoute.value.params.organizationId)
);

const client = computed(() => clientStore.clients[0]);

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

onMounted(async () => {
  await clientStore.getClientWithOrganization(
    inspectionId.value,
    clientId.value,
    organizationId.value
  );
  form.value.name = client.value.organizations[0].name;
  form.value.organizationInn = client.value.organizations[0].organizationInn;

  form.value.organizationJuridicalAddress =
    client.value.organizations[0].organizationJuridicalAddress;

  form.value.organizationPhysicalAddress =
    client.value.organizations[0].organizationPhysicalAddress;

  form.value.ownerPosition = client.value.organizations[0].ownerPosition;

  form.value.taxesType =
    taxesOptions.find(
      (option) => option.id === client.value.organizations[0].taxesTypeId
    ) ?? {};

  form.value.organizationKpp = client.value.organizations[0].organizationKpp;
  form.value.organizationOgrn = client.value.organizations[0].organizationOgrn;
});

const form = ref({
  name: "",
  organizationInn: "",
  organizationJuridicalAddress: "",
  organizationKpp: "",
  organizationOgrn: "",
  organizationPhysicalAddress: "",
  ownerPosition: "",
  taxesType: {},
});

const checkChange = (field: string, isOptions: boolean) => {
  if (!client.value) return;
  if (isOptions) {
    if (client.value.organizations[0].taxesTypeId !== form.value.taxesType.id) {
      return "(изменено)";
    }
    return;
  }

  if (form.value[field] !== client.value.organizations[0][field]) {
    return "(изменено)";
  }
};

const submit = async () => {
  const changeData = {
    id: organizationId.value,
    name: form.value.name,
    organizationInn: form.value.organizationInn,
    organizationJuridicalAddress: form.value.organizationJuridicalAddress,
    organizationKpp: form.value.organizationKpp,
    organizationOgrn: form.value.organizationOgrn,
    organizationPhysicalAddress: form.value.organizationPhysicalAddress,
    ownerPosition: form.value.ownerPosition,
    taxesTypeId: form.value.taxesType.id,
  };

  clientStore
    .editOrganization(changeData)
    .then(() => {
      ElNotification({
        type: "success",
        duration: 1500,
        showClose: true,
        message: "Данные организации успешно изменены",
      });
    })
    .catch((error) => {
      console.log("error occured", error);
      ElNotification({
        type: "error",
        duration: 1500,
        showClose: true,
        message: "Во время выполнения запроса произошла ошибка",
      });
    });
};
</script>
