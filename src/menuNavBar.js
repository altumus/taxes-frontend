import { mdiLogout, mdiThemeLightDark } from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    label: "Мой профиль",
    to: "/profile",
  },
  {
    icon: mdiThemeLightDark,
    label: "Оформление",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: "Выход",
    isDesktopNoLabel: true,
    isLogout: true,
  },
];
