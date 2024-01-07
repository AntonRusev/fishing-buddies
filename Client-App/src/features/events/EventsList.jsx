import { useGetAllEventsQuery } from "./eventsApiSlice";
import EventCard from "./EventCard";
import BreadcrumbNav from "../../components/common/Breadcrumb";

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