import { createPinia } from "pinia";
import { createApp } from "vue";

import { darkModeKey, styleKey } from "@/config.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import elementPlusRuLocale from 'element-plus/dist/locale/ru';

import App from "./App.vue";
import "./css/main.css";
import router from "./router";

window.addEventListener('unhandledrejection', (event) => {
  if(event.reason?.response?.data?.message === 'Unauthorized') {
    router.push('/login')
  }
})

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
  locale: elementPlusRuLocale
}).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Налоговая инспекция";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
