import { useState } from "react";
import { useRouter } from "next/router";

function EventList({ eventList }) {
  const [events, setEvents] = useState(eventList);

  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      "http://localhost:4000/events?category=sports"
    );

    const data = await response.json();
    console.log("data", data);
    setEvents(data);

    router.push("events?category=sports", undefined, { shallow: true });
  };

  return (
    <div>
      <button onClick={fetchSportsEvents}>Sports category </button>
      <h2>Event List</h2>
      {events.map((list) => {
        return (
          <div key={list.id}>
            <h2>
              {list.id}- {list.title} - {list.date} - {list.category}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default EventList;
export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;

  const queryString = category ? "category=sports" : "";

  const response = await fetch(`http://localhost:4000/events?${queryString}`);

  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
