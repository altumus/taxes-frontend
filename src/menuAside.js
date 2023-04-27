import { mdiAccountCircle, mdiCrowd, mdiPlus, mdiTable } from "@mdi/js";

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
    to: "/organization",
    label: "Организация",
    icon: mdiCrowd,
  },
  {
    to: '/clientForm',
    label: 'Внести доход',
    icon: mdiPlus
  },
  {
    to: '/clientPayment',
    label: 'Внести платеж',
    icon: mdiPlus
  }
];
