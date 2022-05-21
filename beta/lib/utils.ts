import { Event } from "lib/interfaces"

export const dayToNumber = (type: string): number => {
  switch (type) {
  case "Sunday":
    return 0
  case "Monday":
    return 1
  case "Tuesday":
    return 2
  case "Wednesday":
    return 3
  case "Thursday":
    return 4
  case "Friday":
    return 5
  case "Saturday":
    return 6
  }
}

export const getNextDate = (day: number): Date => {
  const now = new Date()
  const dateCopy = new Date(now.getTime())
  let nextDate: Date
  if (day  === now.getDay()) {
    return nextDate = now
  }
  nextDate = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + day) % 7 || 7)
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
