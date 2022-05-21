export interface Event {
  _id: string
  _type: "event"
  day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
  slug: string
  title: string
}
