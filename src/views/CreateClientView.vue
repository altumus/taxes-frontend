<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Данные клиента">
        <span />
      </SectionTitleLineWithButton>
      <CardBox is-form>
        <FormField>
          <FormControl placeholder="ФИО" required name="fio" type="text" />
          <FormControl placeholder="ИНН" required name="inn" type="text" />
          <FormControl
            v-model="selectedClientOption"
            :options="clientOptions"
            required
            name="inn"
            type="text"
          />
          <FormControl
            placeholder="Номер телефона"
            required
            name="phone"
            type="text"
          />
          <FormControl placeholder="Email" name="email" type="text" />
        </FormField>
      </CardBox>
      <SectionTitleLineWithButton title="Данные организации">
        <span />
      </SectionTitleLineWithButton>
      <CardBox is-form>
        <FormField>
          <FormControl
            placeholder="Название организации"
            required
            name="name"
            type="text"
          />
          <FormControl placeholder="ИНН" required name="inn" type="text" />
          <FormControl placeholder="КПП" required name="kpp" type="text" />
          <FormControl placeholder="ОГРН" required name="ogrn" type="text" />
          <FormControl
            placeholder="Физический адрес"
            required
            name="physicalAdress"
            type="text"
          />
          <FormControl
            placeholder="Юрдический адрес"
            required
            name="JurAdress"
            type="text"
          />
          <FormControl
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
import { reactive, ref, watch } from "vue";
import { computed } from "@vue/reactivity";

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
