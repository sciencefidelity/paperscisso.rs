import { Event } from "lib/interfaces"

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

export const getNextDate = (day: number): Date => {
  const now = new Date()
  const dateCopy = new Date(now.getTime())
  const nextDate = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + day - 1) % 7 || 7)
    )
  )
  return nextDate
}

export const sortWorkshops = (events: Event[]): Event[] => {
  return events.sort((a, b) => {
    return getNextDate(dayToNumber(a.day)).toISOString() <
      getNextDate(dayToNumber(b.day)).toISOString()
      ? -1
      : getNextDate(dayToNumber(a.day)).toISOString() >
        getNextDate(dayToNumber(b.day)).toISOString()
        ? 1
        : 0
  })
}
