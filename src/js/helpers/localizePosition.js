export const localizePosition = (position) => {
  switch (position) {
    case 'ADMIN':
      return 'Администратор'
    case 'VIEWER':
      return 'Бухгалтер'
    default:
      break
  }
}
