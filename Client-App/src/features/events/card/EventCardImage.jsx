import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const EventCardImage = ({ fishingEvent }) => {
    const [host, setHost] = useState({});

    useEffect(() => {
        fishingEvent.attendees.map(attendee => {
            // Get the host User info from the attendee that maches the hostUsername of the Event
            if (attendee.username === fishingEvent.hostUsername) {
                setHost(attendee);
            };
        });
    }, [fishingEvent]);

    return (
        <div className="sm:flex-shrink-0 md:flex-shrink-0">
            <NavLink to={`/profile/${host.username}`}>
                <img
                    className="object-cover inline-block min-h-full max-h-full w-full sm:w-56 md:w-56 lg:w-56 "
                    src={host.image || "/user.png"}
                    alt="avatar"
                />
            </NavLink>
        </div>
    );
};

export default EventCardImage;