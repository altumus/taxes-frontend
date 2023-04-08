<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-start">
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block"></div>
        <h1 class="text-2xl">
          <b>{{ userName }}</b>
        </h1>
        <h3 class="text-sm">
          <b>Бухгалтер</b>
        </h3>
      </div>
    </BaseLevel>
  </CardBox>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";

const mainStore = useMainStore();

const userName = computed(() => mainStore.userName);

const userSwitchVal = ref(false);
</script>
