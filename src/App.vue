<template>
  <RouterView />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useUserStore } from "./stores/user";
import { RouterView } from "vue-router";

export default defineComponent({
  components: {
    RouterView,
  },
  mounted() {
    const login = String(localStorage.getItem("login"));
    const password = String(localStorage.getItem("password"));
    if (!login || !password) {
      this.$router.push("/login");
      return;
    }
    this.userStore.login(login, password, true);
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    logout() {
      localStorage.setItem("login", "");
      localStorage.setItem("password", "");
    },
  },
});
</script>
