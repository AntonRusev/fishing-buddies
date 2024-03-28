import { Avatar, Tooltip } from 'flowbite-react';

const EventCardAttendees = ({ fishingEvent }) => {
    return (
        <div
            className="absolute bottom-0 right-0 bg-transparent text-gray-100 font-semibold hover:text-black py-2 px-4 mb-2"
            data-tooltip-id={fishingEvent.id}
        >
            {/* TOOLTIP POPOVER ATTENDEES */}
            {/* Show tooltip popover with all atendees' names */}
            <Tooltip content={
                <div>
                    <h5 className="font-semibold text-white">
                        Attendees:
                    </h5>
                    {
                        fishingEvent.attendees.map(an => {
                            return (
                                <span
                                    key={an.username}
                                    className="text-sm text-white block"
                                >
                                    {an.username}
                                </span>
                            );
                        })
                    }
                </div>
            }>
                {/* Show the AVATARS of the first 3 attendees */}
                <Avatar.Group>
                    {fishingEvent.attendees
                        .slice(0, 3)
                        .map(attendee => {
                            return (
                                <Avatar
                                    key={attendee.username}
                                    img={attendee.image}
                                    rounded
                                    stacked
                                    data-testid="card-event-attendee"
                                />
                            );
                        })}
                    {/* Show count of how many other attendees are there, beside the first 3 */}
                    {fishingEvent.attendees.length > 3 &&
                        <Avatar.Counter total={fishingEvent.attendees.length - 3} />
                    }
                </Avatar.Group>
            </Tooltip>
        </div>
    );
};

export default EventCardAttendees;