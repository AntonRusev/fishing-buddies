import React from "react";
import { NavLink } from "react-router-dom";

import { useUpdateAttendanceMutation } from "./eventsApiSlice";

import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';

let EventCard = ({ fishingEvent }) => {
    const [updateAttendance] = useUpdateAttendanceMutation();

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id).unwrap();
    };

    // const content = (
    //     <article>
    //         <h4>{fishingEvent.title}</h4>
    //         <p>{fishingEvent.date}</p>
    //         <p>{fishingEvent.description}</p>
    //         <p>Category: {fishingEvent.category}</p>
    //         <p>Region: {fishingEvent.region}</p>
    //         <p>Hosted by {fishingEvent.hostUsername}</p>
    //         <p>
    //             Active:
    //             {fishingEvent.isCancelled
    //                 ? "is cancelled"
    //                 : "is active"
    //             }
    //         </p>
    //         <div>
    //             Attended by:
    //             <ul>
    //                 {fishingEvent.attendees.map(a => (
    //                     <li key={a.username}>
    //                         {a.username}
    //                     </li>
    //                 ))}
    //             </ul>
    //             <button onClick={handleAttendanceSubmit}>Attend</button>
    //         </div>
    //     </article>
    // );

    const content = (
        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {fishingEvent.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        {fishingEvent.date}
        {fishingEvent.description}
        </p>
        <Button as={NavLink} to={`/events/${fishingEvent.id}`} size="xs">View</Button>
      </Card>
    );

    return content;
};

EventCard = React.memo(EventCard);

export default EventCard;