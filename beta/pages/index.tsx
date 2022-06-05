import type { GetStaticProps } from "next"
import format from "date-fns/format"
import sanityClient from "lib/sanityClient"
import { dayToNumber, nextDate, sortWorkshops } from "lib/utils"
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
      <div>
        {sortWorkshops(events).map((event, idx) =>
          <div key={idx}>
            <p>{event.title}</p>
            <p>{event.day}</p>
            <p>{event.frequency}</p>
            <p>{format(nextDate(dayToNumber(event.day), event.frequency), "eeee, d MMMM")}</p>
            <br />
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
