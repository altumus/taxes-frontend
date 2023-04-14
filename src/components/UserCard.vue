<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-start">
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block"></div>
        <h1 class="text-2xl">
          <b>{{ user.name }}</b>
        </h1>
        <h3 class="text-sm">
          <b>Бухгалтер</b>
        </h3>
      </div>
    </BaseLevel>
  </CardBox>
</template>

<script setup>
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";
import { useUserStore } from "@/stores/user";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();

const user = computed(() => {
  return userStore.user;
});
</script>
