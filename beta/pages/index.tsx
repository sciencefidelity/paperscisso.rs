import type { GetStaticProps } from "next"
import format from "date-fns/format"
import sanityClient from "lib/sanityClient"
import { dayToNumber, getNextMonday } from "lib/utils"
import { events } from "lib/queries"
import { Event } from "lib/interfaces"

export const getStaticProps: GetStaticProps = async () => {
  const data = await sanityClient.fetch(events)
  return {
    props: { data }
  }
}

const Home = ({ data }) => {
  const { events } = data as { events: Event[] }
  return (
    <div>
      <br />
      {format(new Date("2022-05-22"), "e")}<br />
      {format(new Date("2022-05-23"), "e")}<br />
      {format(new Date("2022-05-24"), "e")}<br />
      {format(new Date("2022-05-25"), "e")}<br />
      {format(new Date("2022-05-26"), "e")}<br />
      {format(new Date("2022-05-27"), "e")}<br />
      {format(new Date("2022-05-28"), "e")}<br />
      <br />
      {format(new Date("2022-05-22"), "eeee")}<br />
      {format(new Date("2022-05-23"), "eeee")}<br />
      {format(new Date("2022-05-24"), "eeee")}<br />
      {format(new Date("2022-05-25"), "eeee")}<br />
      {format(new Date("2022-05-26"), "eeee")}<br />
      {format(new Date("2022-05-27"), "eeee")}<br />
      {format(new Date("2022-05-28"), "eeee")}<br />
      <br />
      {events.map((event, idx) =>
        <div key={idx}>
          <p>{event.title}</p>
          <p>{dayToNumber(event.day)}</p>
          <p>{format(getNextMonday(new Date(), dayToNumber(event.day)), "eee, d MMM")}</p>
        </div>
      )}
    </div>
  )
}
export default Home
