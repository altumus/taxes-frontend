import {
  mdiAccountCircle,
  mdiLock,
  mdiMonitor,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
} from "@mdi/js";

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
    to: "/forms",
    label: "Forms",
    icon: mdiSquareEditOutline,
  },
  {
    to: "/profile",
    label: "Настройки",
    icon: mdiAccountCircle,
  },
  {
    to: "/login",
    label: "Авторизация",
    icon: mdiLock,
  },
  {
    label: "Dropdown",
    icon: mdiViewList,
    menu: [
      {
        label: "Item One",
      },
      {
        label: "Item Two",
      },
    ],
  },
];
