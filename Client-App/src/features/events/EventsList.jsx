import { useMemo } from 'react';

import EventCard from "./card/EventCard";

const EventsList = ({ fishingEvents }) => {

    const sortedEvents = useMemo(() => {
        if (fishingEvents) {
            const sortedEventsVar = fishingEvents.slice();
            sortedEventsVar.sort((a, b) => a.date.localeCompare(b.date));
            return sortedEventsVar;
        } else {
            return [];
        };
    }, [fishingEvents]);

    const content = (
        sortedEvents.map(fe => (
            <EventCard key={fe.id} fishingEvent={fe} />
        ))
    );

    return (
        <section data-testid="events-list">
            {content}
        </section>
    );
};

export default EventsList;