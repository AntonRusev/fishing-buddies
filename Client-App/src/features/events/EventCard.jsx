import React from "react";
import { useUpdateAttendanceMutation } from "./eventsApiSlice";

let EventCard = ({ fishingEvent }) => {
    const [updateAttendance] = useUpdateAttendanceMutation();

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id).unwrap();
    };

    const content = (
        <article>
            <h4>{fishingEvent.title}</h4>
            <p>{fishingEvent.date}</p>
            <p>{fishingEvent.description}</p>
            <p>Category: {fishingEvent.category}</p>
            <p>Region: {fishingEvent.region}</p>
            <p>Hosted by {fishingEvent.hostUsername}</p>
            <p>Active: {fishingEvent.isCancelled}</p>
            <div>
                Attended by:
                <ul>
                    {fishingEvent.attendees.map(a => (
                        <li key={a.username}>
                            {a.username}
                        </li>
                    ))}
                </ul>
                <button onClick={handleAttendanceSubmit}>Attend</button>
            </div>
        </article>
    );

    return content;
};

EventCard = React.memo(EventCard);

export default EventCard;