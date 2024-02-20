import { NavLink } from 'react-router-dom';
import { Avatar, Badge } from 'flowbite-react';

const EventDetailedAttendees = ({ fishingEvent }) => {
    const attendees = fishingEvent.attendees;
    const host = fishingEvent.hostUsername;

    const content = (
        <div className="mb-4 flex flex-col items-center justify-between lg:border-b border-gray-200 dark:border-gray-700 dark:text-white">
            <h4 className='flex justify-center hidden py-2 bg-gray-800 text-white dark:border-gray-600 dark:text-white border-b border-gray-200 dark:border-gray-700 w-full rounded-t lg:flex'>
                {/* COUNT */}
                {attendees.length === 1
                    ? "1 person going"
                    : `${attendees.length} people going`
                }

            </h4>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {attendees.map(attendee => (
                    <li
                        key={attendee.username}
                        className="py-3 sm:py-4"
                    >
                        <div className="flex items-center space-x-4 px-2">
                            <div className="shrink-0">

                                {/* AVATAR */}
                                <NavLink to={`/profile/${attendee.username}`}>
                                    <Avatar
                                        img={attendee.image}
                                        size="lg"
                                        bordered
                                        color={attendee.username === host
                                            ? "purple"
                                            : attendee.following
                                                ? "success"
                                                : 'gray'
                                        }
                                    />
                                </NavLink>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-md font-bold text-gray-900 dark:text-white">

                                    {/* USERNAME */}
                                    <NavLink to={`/profile/${attendee.username}`}>
                                        {attendee.username}
                                    </NavLink>
                                </p>
                                <p className="truncate text-md text-gray-500 dark:text-gray-400">

                                    {/* BIO */}
                                    {attendee.bio && attendee.bio.length > 15
                                        ? attendee.bio.substring(0, 15) + "..."
                                        : attendee.bio
                                    }
                                </p>
                            </div>

                            {/* BADGES */}
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {attendee.username === host &&
                                    <Badge color="purple">
                                        Host
                                    </Badge>
                                }
                                {attendee.following &&
                                    <Badge color="success">
                                        Following
                                    </Badge>
                                }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return content;
};

export default EventDetailedAttendees;