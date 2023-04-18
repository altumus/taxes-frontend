import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    meta: {
      title: "Клиенты",
    },
    path: "/clients",
    name: "clients",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Профиль",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: 'Форма клиента'
    },
    path: '/clientForm',
    name: 'clientForm',
    component: () => import('@/views/ClientFormView.vue')
  },
  {
    meta: {
      title: 'Создать клиента'
    },
    path: '/createClient',
    name: 'createClient',
    component: () => import('@/views/CreateClientView.vue')
  },
  {
    meta: {
      title: 'Информация о клиенте'
    },
    path: '/clientDetails/:clientId',
    name: 'clientDetails',
    component: () => import ('@/views/ClientDetailsView.vue')
  },
  {
    meta: {
      title: "Авторизация",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/:catchAll(.*)",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
