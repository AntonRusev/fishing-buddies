import React from "react";

import EventCardAttendees from "./EventCardAttendees";
import EventCardBadge from "./EventCardBadge";
import EventCardButton from "./EventCardButton";
import EventCardDate from "./EventCardDate";
import EventCardImage from "./EventCardImage";
import EventCardRegion from "./EventCardRegion";

let EventCard = ({ fishingEvent }) => {
    const content = (
        <div
            className="relative overflow-hidden m-4 border-2 border-cyan-600 dark:border-white rounded sm:flex md:flex px-5 py-3 font-lato bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
            data-testid="event-card"
        >
            {/* CANCELLED RIBBON */}
            {fishingEvent.isCancelled &&
                <div className="absolute left-0 top-0 h-16 w-16">
                    <div
                        className="absolute transform -rotate-45 bg-orange-600 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                        Cancelled
                    </div>
                </div>
            }

            {/* HOST IMAGE */}
            <EventCardImage fishingEvent={fishingEvent} />

            {/* EVENT INFO */}
            <div className="w-full ml-3 md:mt-0 md:ml-6 sm:ml-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {/* TITLE */}
                        <h2 className="mt-2 mb-1 tracking-wider text-lg text-600 font-bold font-serif align-super text-gray-700 dark:text-white">
                            {fishingEvent.title}
                        </h2>

                        {/* BADGE */}
                        <EventCardBadge fishingEvent={fishingEvent} />
                    </div>

                    {/* DATE */}
                    <EventCardDate fishingEvent={fishingEvent} />
                </div>

                {/* REGION LOCATION */}
                <EventCardRegion fishingEvent={fishingEvent} />

                {/* DESCRIPTION */}
                <p className="mb-2 mt-2 mr-6 text-gray-300 md:w-3/4 lg:w-3/4 text-gray-500 dark:text-gray-200 ">
                    {/* Shortening the description, if it's longer than 80 symbols */}
                    {fishingEvent.description && fishingEvent.description.length > 80
                        ? (fishingEvent.description)?.substring(0, 80) + "..."
                        : fishingEvent.description
                    }
                </p>

                <div className="position: relative h-16 mb-2">
                    {/* ATTENDEES */}
                    <EventCardAttendees fishingEvent={fishingEvent} />

                    {/* VIEW BUTTON/LINK */}
                    <EventCardButton fishingEvent={fishingEvent} />
                </div>
            </div>
        </div>
    );

    return content;
};

EventCard = React.memo(EventCard);

export default EventCard;