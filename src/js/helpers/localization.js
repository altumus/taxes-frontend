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
      return 'Индивидуальный предприниматель'
    case 'UL':
      return 'Юридическое лицо'
    default:
      return 'Самозанятый'
  }
}
