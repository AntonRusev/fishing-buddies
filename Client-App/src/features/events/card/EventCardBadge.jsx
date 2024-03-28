import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from 'flowbite-react';

import { selectCurrentUsername } from "../../auth/authSlice";

const EventCardBadge = ({ fishingEvent }) => {
    const [userIsHost, setUserIsHost] = useState(false);
    const [userIsAttendee, setUserIsAttendee] = useState(false);

    const user = useSelector(selectCurrentUsername);

    useEffect(() => {
        fishingEvent.attendees.map(attendee => {
            if (attendee.username === fishingEvent.hostUsername && attendee.username === user) {
                // If the authenticated User is host of the Event
                setUserIsHost(true);
            } else if (attendee.username === user) {
                // If the authenticated User is one of attendees of the Event
                setUserIsAttendee(true);
            };
        });
    }, [fishingEvent]);

    return (
        <div className="mb-1 tracking-wide font-bold align-super text-gray-500 dark:text-gray-400">
            {/* If the Current User is Host or is Attending the Event show a Badge 
            else show the name of the Host of the Event */}
            {!userIsHost && !userIsAttendee
                ? `Hosted by ${fishingEvent.hostUsername}`
                : <Badge
                    color={userIsHost ? "purple" : "success"}
                    className="max-w-fit uppercase font-semibold inline-block"
                >
                    {userIsHost
                        ? "Hosting"
                        : "Attending"
                    }
                </Badge>
            }
        </div>
    );
};

export default EventCardBadge;