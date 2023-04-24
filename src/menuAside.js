import { mdiAccountCircle, mdiPlus, mdiTable } from "@mdi/js";

export default [
  {
    to: "/clients",
    label: "Юр. Лица",
    icon: mdiTable,
  },
  {
    to: "/profile",
    label: "Мой профиль",
    icon: mdiAccountCircle,
  },
  {
    to: '/clientForm',
    label: 'Внести платеж',
    icon: mdiPlus
  }
];
