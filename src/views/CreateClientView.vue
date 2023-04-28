<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox is-form @submit.prevent="submit">
        <SectionTitleLineWithButton title="Данные контрагента">
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
        <BaseButton
          v-if="!isLoading"
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
import "element-plus/es/components/notification/style/css";
import { ElNotification } from "element-plus";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import { ref } from "vue";
import { mdiCheck } from "@mdi/js";
import { useClientStore } from "@/stores/clients";

const form = ref({
  fio: "",
  inn: "",
  phone: "",
  email: "",
});

const clientStore = useClientStore();
const isLoading = ref(false);

const clearForm = () => {
  const formKeys = Object.keys(form.value);
  for (let i = 0; i < formKeys.length; i++) {
    form.value[formKeys[i]] = "";
  }
};

const submit = async () => {
  const clientData = {
    name: form.value.fio,
    inn: form.value.inn,
    phone: form.value.phone,
    email: form.value.email,
    type: selectedClientOption.value.value,
  };

  clientStore
    .createClient(clientData)
    .then((resp) => {
      ElNotification({
        message: "Контрагент успешно создан",
        duration: 4500,
        type: "success",
      });
    })
    .catch(() => {
      ElNotification({
        message: "Контрагент закреплен за другой инспекцией",
        duration: 4500,
        type: "error",
      });
    });

  clearForm();
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

const selectedClientOption = ref(clientOptions[0]);
</script>
