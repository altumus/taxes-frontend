<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { useUserStore } from "@/stores/user";

const form = reactive({
  login: "",
  pass: "",
});

const router = useRouter();

const userStore = useUserStore();

const submit = () => {
  userStore.login(form.login, form.pass, false);
  router.push("/clients");
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Логин" help="Введите логин">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="Логин"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Пароль" help="Введите пароль">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="Пароль"
            autocomplete="current-password"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Войти" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
