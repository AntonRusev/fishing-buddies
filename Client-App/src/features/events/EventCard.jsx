import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

import { selectCurrentUsername } from "../auth/authSlice";

import { Button, Avatar, Badge } from 'flowbite-react';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { HiLocationMarker } from "react-icons/hi";

let EventCard = ({ fishingEvent }) => {
    const [host, setHost] = useState({});
    const [userIsHost, setUserIsHost] = useState(false);
    const [userIsAttendee, setUserIsAttendee] = useState(false);

    const user = useSelector(selectCurrentUsername);

    useEffect(() => {
        fishingEvent.attendees.map(attendee => {
            if (attendee.username === fishingEvent.hostUsername) {
                setHost(attendee);
                if (attendee.username === user) {
                    setUserIsHost(true);
                };
            };

            if (attendee.username === user) {
                setUserIsAttendee(true);
            };
        });
    }, [fishingEvent]);

    // Getting the Day, Month and Year from the Event object;
    const [day, month, year] = format(fishingEvent.date, 'dd MMM yyyy').split(' ');

    const content = (
        <div className="relative overflow-hidden m-4 border-2 border-cyan-600 dark:border-white rounded sm:flex md:flex px-5 py-3 font-lato bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-400">

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
            <div className="sm:flex-shrink-0 md:flex-shrink-0">
                <NavLink to={`/profile/${host.username}`}>
                    <img className="object-cover inline-block min-h-full max-h-full w-full sm:w-56 md:w-56 lg:w-56 " src={host.image || "/user.png"} alt="avatar" />
                </NavLink>
            </div>
            <div className="w-full ml-3 md:mt-0 md:ml-6 sm:ml-3">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {/* TITLE */}
                        <h2 className="mt-2 mb-1 tracking-wider text-lg text-600 font-bold font-serif align-super text-gray-700 dark:text-white">
                            {fishingEvent.title}
                        </h2>
                        <div className="mb-1 tracking-wide font-bold align-super text-gray-500 dark:text-gray-400">

                            {/* BADGE */}
                            {/* If the Current User is Host or is Attending the Event show a Badge 
                                else show the Host of the Event */}
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
                    </div>

                    {/* DATE */}
                    <div className="position: relative">
                        <div className="text-base font-normal uppercase pb-3 absolute top-2.5 right-0 px-0.5 pb-0.5 w-20 text-center border-2 border-gray-700 dark:border-white mr-4 font-serif text-gray-700 dark:text-white">
                            <h3 className="text-center pt-1 pt-2 text-xl tracking-wider leading-tight text-lg text-600 font-bold">
                                {month}
                            </h3>
                            <h3 className="text-2xl text-center tracking-wider leading-tight text-xl text-600 font-bold">
                                {day}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* REGION LOCATION */}
                <div className="block mt-1 mr-6 text-lg md:w-3/4 lg:w-3/4 leading-tight font-semibold text-gray-200 hover:underline text-gray-700 dark:text-white">
                    <small className="mb-1 text-400 align-super">
                        <HiLocationMarker className="inline-block align-top" />
                        {fishingEvent.region}
                    </small>
                </div>

                {/* DESCRIPTION */}
                <p className="mb-2 mt-2 mr-6 text-gray-300 md:w-3/4 lg:w-3/4 text-gray-500 dark:text-gray-200 ">
                    {fishingEvent.description && fishingEvent.description.length > 80
                        ? (fishingEvent.description)?.substring(0, 80) + "..."
                        : fishingEvent.description
                    }
                </p>

                {/* ATTENDEES */}
                <div className="position: relative h-16 mb-2">
                    <div
                        data-tooltip-id={fishingEvent.id}
                        className="absolute bottom-0 right-0 bg-transparent uppercase text-gray-100 font-semibold hover:text-black py-2 px-4 mb-2"
                    >
                        {/* Show the AVATARS of the attendees */}
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
                                        />
                                    );
                                })}
                            {fishingEvent.attendees.length > 3 &&
                                <Avatar.Counter total={fishingEvent.attendees.length - 3} />
                            }
                        </Avatar.Group>
                    </div>

                    {/* TOOLTIP POPOVER ATTENDEES */}
                    <ReactTooltip
                        id={fishingEvent.id}
                        opacity={1}
                        style={{ backgroundColor: "#64748b" }}
                    >
                        <div className="flex flex-col">
                            {/* Show tooltip popover with all atendees' names */}
                            <h5 className="font-semibold text-white">
                                Attendees:
                            </h5>
                            {fishingEvent.attendees.map(an => {
                                return (
                                    <span
                                        key={an.username}
                                        className="text-sm text-white"
                                    >
                                        {an.username}
                                    </span>
                                );
                            })}
                        </div>
                    </ReactTooltip>

                    {/* VIEW BUTTON/LINK */}
                    <Button
                        className="absolute bottom-0 left-0 max-w-fit uppercase font-semibold py-2 px-4 mb-2"
                        // className="absolute bottom-0 right-0 bg-transparent uppercase  hover:bg-red-500 text-gray-100 font-semibold hover:text-black py-2 px-4 border-2 border-red-500 hover:border-transparent mb-2 mr-4"
                        as={NavLink}
                        to={`/events/${fishingEvent.id}`} size="xs"
                        color="light"
                    >
                        View
                    </Button>
                </div>
            </div>
        </div>
    );

    return content;
};

EventCard = React.memo(EventCard);

export default EventCard;