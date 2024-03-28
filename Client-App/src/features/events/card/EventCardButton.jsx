import { NavLink } from "react-router-dom";
import { Button } from 'flowbite-react';

const EventCardButton = ({ fishingEvent }) => {
    return (
        <Button
            className="absolute bottom-0 left-0 max-w-fit uppercase font-semibold py-2 px-4 mb-2"
            as={NavLink}
            to={`/events/${fishingEvent.id}`}
            size="xs"
            color="light"
        >
            View
        </Button>
    );
};

export default EventCardButton;