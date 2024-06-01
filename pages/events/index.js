import { useEffect, useState } from 'react';
import { getEvents } from '../../api/eventData';
import EventCard from '../../components/game/EventCard';

function Home() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard event={event.description} date={event.date} time={event.time} organizer={event.organizer} game={event.game} />
        </section>
      ))}
    </article>
  );
}

export default Home;
