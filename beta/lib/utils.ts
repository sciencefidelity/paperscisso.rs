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

export const getNextDate = (day: number, frequency: number): Date => {
  const now = new Date()
  const dateCopy = new Date(now.getTime())
  console.log(now.getDay())
  let nextDate: Date
  if (day === now.getDay()) {
    return (nextDate = now)
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
    return getNextDate(
      dayToNumber(a.day),
      parseInt(a.frequency)
    ).toISOString() <
      getNextDate(dayToNumber(b.day), parseInt(b.frequency)).toISOString()
      ? -1
      : getNextDate(dayToNumber(a.day), parseInt(a.frequency)).toISOString() >
        getNextDate(dayToNumber(b.day), parseInt(b.frequency)).toISOString()
        ? 1
        : 0
  })
}

// export const getMondays = () => {
//   const d = new Date(),
//     month = d.getMonth(),
//     days = []
//   d.setDate(1)
//   // Get the first Monday in the month
//   while (d.getDay() !== 1) {
//     d.setDate(d.getDate() + 1)
//   }
//   // Get all the other Mondays in the month
//   while (d.getMonth() === month) {
//     days.push(new Date(d.getTime()))
//     d.setDate(d.getDate() + 7)
//   }
//   return days
// }
