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

export const readableDate = (userDate) => {
  const date = new Date(userDate)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month: month}.${year}`
  return formattedDate
}
