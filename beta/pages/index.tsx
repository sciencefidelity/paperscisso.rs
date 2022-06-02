import type { GetStaticProps } from "next"
import format from "date-fns/format"
import sanityClient from "lib/sanityClient"
import { dayToNumber, getMondays, getNextDate, sortWorkshops } from "lib/utils"
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
            <p>{format(getNextDate(dayToNumber(event.day), parseInt(event.frequency)), "eee, d MMM")}</p>
            <p>{event.frequency}</p>
            <br />
          </div>
        )}
      </div>
      {/* <div>
        {getMondays().map(monday =>
          <p key={monday}>{format(monday, "eeee, d MMMM")}</p>
        )}
      </div> */}
    </div>
  )
}
export default Home
