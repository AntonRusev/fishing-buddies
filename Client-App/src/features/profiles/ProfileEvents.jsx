import { useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button, ButtonGroup } from "flowbite-react";

import { useListProfileEventsQuery } from "./profilesApiSlice";

import ProfileHeader from "./ProfileHeader";
import CustomSpinner from "../../components/common/CustomSpinner";

import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const ProfileEvents = () => {
    const [predicate, setPredicate] = useState('hosting');
    const { username } = useParams();

    const { data, isLoading, isFetching, isSuccess } = useListProfileEventsQuery({ username, predicate }, { skip: !predicate });

    const profileEventsList = useMemo(() => {
        if (isLoading || isFetching) {
            return (
                <CustomSpinner text={`Loading ${predicate} events...`} />
            );
        } else if (isSuccess && data.length > 0) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
                    {data.map(event => (
                        // EVENT PREVIEW CARD
                        <div
                            key={event.id}
                            className="max-w-sm col-span-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        >
                            <NavLink to={`/events/${event.id}`}>
                                <div className="sm:flex-shrink-0 md:flex-shrink-0">
                                    {/* IMAGE */}
                                    <img className="object-cover inline-block min-h-full max-h-full w-full sm:w-72 md:w-72 lg:w-72 h-44 rounded-t-lg" src={`/${event.category}.png`} alt="fishing ground" />
                                </div>
                                <div className="p-5">
                                    {/* TITLE */}
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight font-serif text-gray-900 dark:text-white">
                                        {event.title}
                                    </h5>
                                    {/* DATE */}
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {format(event.date, 'dd MMM yyyy')}
                                    </p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <p className="ml-4 text-gray-500 italic tracking-wide dark:text-gray-300">
                    There are no events.
                </p>
            );
        };
    });

    let content = (
        <article className="flex flex-col justify-center align-center items-center dark:bg-gray-900">
            <ProfileHeader />
            <div className="flex flex-col w-full items-center pb-8 md:mb-8 bg-gray-50 rounded xl:max-w-screen-xl sm:w-3/4 dark:bg-gray-800">
                <div className="flex flex-col w-full items-center bg-gray-50 rounded xl:max-w-screen-xl sm:w-3/4 dark:bg-gray-800" >
                    {/* NAV BUTTONS */}
                    <ButtonGroup
                        className="flex justify-stretch w-full tracking-wider mt-2 p-2 lg:mt-8 lg:mb-2"
                        outline
                    >
                        <Button
                            onClick={() => setPredicate("hosting")}
                            className="flex-grow font-semibold"
                            disabled={isLoading || isFetching}
                        >
                            Hosting
                        </Button>

                        <Button
                            onClick={() => setPredicate("future")}
                            className="flex-grow font-semibold"
                            disabled={isLoading || isFetching}
                        >
                            Future Events
                        </Button>

                        <Button
                            onClick={() => setPredicate("past")}
                            className="flex-grow font-semibold"
                            disabled={isLoading || isFetching}
                        >
                            Past Events
                        </Button>
                    </ButtonGroup>
                </div>

                {/* TITLE */}
                <h4 className="mr-auto mb-4 pl-8 font-bold text-lg text-gray-900 font-serif tracking-wide dark:text-white">
                    {capitalizeFirstLetter(predicate)}
                </h4>

                {/* EVENTS LIST */}
                {profileEventsList}
            </div>
        </article>
    );

    return content;
};

export default ProfileEvents;