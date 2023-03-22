import { mdiAccountCircle, mdiMonitor, mdiTable } from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Главная",
  },
  {
    to: "/tables",
    label: "Юр. Лица",
    icon: mdiTable,
  },
  {
    to: "/profile",
    label: "Мой профиль",
    icon: mdiAccountCircle,
  },
];
