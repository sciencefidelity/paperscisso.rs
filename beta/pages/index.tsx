import type { GetStaticProps } from "next"
import format from "date-fns/format"
import sanityClient from "lib/sanityClient"
import { dayToNumber, getNextDate, sortWorkshops } from "lib/utils"
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
      {sortWorkshops(events).map((event, idx) =>
        <div key={idx}>
          <p>{event.title}</p>
          <p>{format(getNextDate(dayToNumber(event.day)), "eee, d MMM")}</p>
          <br />
        </div>
      )}
    </div>
  )
}
export default Home
