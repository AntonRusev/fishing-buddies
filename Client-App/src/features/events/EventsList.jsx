import { useMemo } from 'react';

import { useGetAllEventsQuery } from "./eventsApiSlice";

import EventCard from "./EventCard";
import BreadcrumbNav from "../../components/common/Breadcrumb";
import { Spinner } from 'flowbite-react';
import EventCardPlaceholder from './EventCardPlaceholder';

const EventsList = () => {
    const {
        data: fishingEvents = [],
        isLoading,
        isSuccess,
    } = useGetAllEventsQuery();

    const sortedEvents = useMemo(() => {
        const sortedEventsVar = fishingEvents.slice();
        sortedEventsVar.sort((a, b) => b.date.localeCompare(a.date));
        return sortedEventsVar;
    }, [fishingEvents]);

    let content;

    if (isLoading) {
        // content = (<Spinner aria-label="Extra large spinner example" size="xl" />);
        content = (
            <div className='flex flex-col gap-4'>
                <EventCardPlaceholder />
                <EventCardPlaceholder />
                <EventCardPlaceholder />
            </div>
        );
    } else if (isSuccess) {
        content = (
            sortedEvents.map(fe => (
                <EventCard key={fe.id} fishingEvent={fe} />
            ))
        );
    };

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