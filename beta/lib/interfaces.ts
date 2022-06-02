export interface Event {
  _id: string
  _type: "event"
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
  frequency: "1" | "2" | "3" | "4" | "5" | "6" | "7"
  slug: string
  title: string
}
