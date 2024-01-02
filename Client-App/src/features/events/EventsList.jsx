import { useEffect } from "react";
import { useGetAllEventsQuery } from "./eventsApiSlice";
import EventCard from "./EventCard";

const EventsList = () => {
    const { data: fishingEvents = [],
        isLoading,
        isSuccess,
        isError,
        error } = useGetAllEventsQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = fishingEvents.map(fe => (
            <EventCard key={fe.id} fishingEvent={fe} />
        ));

    } else if (isError) {
        content = <p>ERROR: {error.toString()}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default EventsList;