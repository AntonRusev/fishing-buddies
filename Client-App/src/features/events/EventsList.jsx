import { useMemo } from 'react';

import EventCard from "./EventCard";
import BreadcrumbNav from "../../components/common/BreadcrumbNav";


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
        <>
            <BreadcrumbNav />
            <section>
                {content}
            </section>
        </>

    );
};

export default EventsList;