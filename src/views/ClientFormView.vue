<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Id Контрагента">
          <FormControl v-model="form.clientId" required name="clientId" />
        </FormField>
        <FormField label="Id организации">
          <FormControl v-model="form.organizationId" required name="orgId" />
        </FormField>
        <FormField label="Сумма дохода">
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
import { ref } from "vue";

const clientStore = useClientStore();

const form = ref({
  clientId: "" as Number | string,
  organizationId: "" as Number | string,
  income: "" as Number | string,
});

const submit = async () => {
  const validate = {
    clientId: Number(form.value.clientId),
    organizationId: Number(form.value.organizationId),
    income: Number(form.value.income),
  };
  await clientStore.createPayment(validate);
  alert("Оплата прошла успешно");
};
</script>
