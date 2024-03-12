import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetEventQuery } from "../eventsApiSlice";
import { selectCurrentUsername } from "../../auth/authSlice";

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedAttendees from "./EventDetailedAttendees";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedButtons from "./EventDetailedButtons";
import EventDetailedChat from "./EventDetailedChat";
import CustomSpinner from "../../../components/common/CustomSpinner";

const EventDetails = () => {
    const { id } = useParams();

    const {
        data: fishingEvent,
        isFetching,
        isSuccess,
    } = useGetEventQuery(id);

    const user = useSelector(selectCurrentUsername);

    let content;

    if (isFetching) {
        content = (
            <div className="flex justify-center items-center h-full">
                <CustomSpinner text="Loading event..." />
            </div>
        );
    } else if (isSuccess && fishingEvent) {
        content = (
            <article className="flex justify-center font-lato pt-8 lg:pt-20 bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col mx-4 w-full justify-start max-w-2xl lg:mx-0 lg:ml-2">
                    {/* DETAILS HEADER */}
                    <EventDetailedHeader fishingEvent={fishingEvent} />

                    {/* BUTTONS */}
                    {/* Only shown to logged in users */}
                    <EventDetailedButtons fishingEvent={fishingEvent} />

                    {/* DETAILS INFO */}
                    <EventDetailedInfo fishingEvent={fishingEvent} />

                    {/* CHAT */}
                    {/* Only shown to logged in users */}
                    {user && <EventDetailedChat eventId={fishingEvent.id} />}
                </div>

                {/* DETAILS ATTENDEES SIDEBAR */}
                {/* NOT visible on small screens */}
                <div className="flex flex-col mx-4 hidden lg:block">
                    <EventDetailedAttendees fishingEvent={fishingEvent} />
                </div>
            </article>
        );
    };

    return content;
};

export default EventDetails;