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

export const localizeClientType = (type) => {
  switch (type) {
    case 'IP':
      return 'ИП'
    case 'UL':
      return 'ЮЛ'
    default:
      return 'Самозанятый'
  }
}
