export const dayToNumber = (type: string): number => {
  switch (type) {
  case "Sunday":
    return 1
  case "Monday":
    return 2
  case "Tuesday":
    return 3
  case "Wednesday":
    return 4
  case "Thursday":
    return 5
  case "Friday":
    return 6
  case "Saturday":
    return 7
  }
}

export function getNextMonday(dateNow: Date, day: number) {
  const dateCopy = new Date(dateNow.getTime())
  const nextMonday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + day) % 7 || 7)
    )
  )
  return nextMonday
}
