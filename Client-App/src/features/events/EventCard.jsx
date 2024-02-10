import React from "react";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

import { useUpdateAttendanceMutation } from "./eventsApiSlice";

import { Button } from 'flowbite-react';
import { Card } from 'flowbite-react';

let EventCard = ({ fishingEvent }) => {
    const [updateAttendance] = useUpdateAttendanceMutation();

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id).unwrap();
    };

    const content = (
        <Card className="max-w-sm" imgSrc="/images/blog/image-4.jpg" horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {fishingEvent.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        {format(fishingEvent.date, 'dd MMM yyyy ')}
        {fishingEvent.description}
        </p>
        <Button as={NavLink} to={`/events/${fishingEvent.id}`} size="xs">View</Button>
      </Card>
    );

    return content;
};

EventCard = React.memo(EventCard);

export default EventCard;