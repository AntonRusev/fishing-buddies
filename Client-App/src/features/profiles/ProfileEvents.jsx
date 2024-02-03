import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

import { useListProfileEventsQuery } from "./profilesApiSlice";

import EventCardPlaceholder from "../events/EventCardPlaceholder";
import { Button, ButtonGroup } from "flowbite-react";
import { HiOutlineArrowLeft } from 'react-icons/hi';

const ProfileEvents = () => {
    const [predicate, setPredicate] = useState();
    const { username } = useParams();

    const { data, isLoading, isSuccess } = useListProfileEventsQuery({ username, predicate }, { skip: !predicate })

    let profileEventsList

    if (isLoading) {
        // TODO - Design the Skeleton(Placeholder) to resemble the actual Card Component
        profileEventsList = (
            <div className='flex flex-col gap-4'>
                <EventCardPlaceholder />
                <EventCardPlaceholder />
                <EventCardPlaceholder />
            </div>
        );
    } else if (isSuccess) {
        profileEventsList = (
            data.map(event => (
                <p key={event.id}>{event.title}</p>
            ))
        );
    };

    let content = (
        <article>
            <div>
                <ButtonGroup outline>
                    <Button
                        onClick={() => setPredicate("hosting")}
                        gradientDuoTone="cyanToBlue"
                    >
                        Hosting
                    </Button>

                    <Button
                        onClick={() => setPredicate("future")}
                        gradientDuoTone="cyanToBlue"
                    >
                        Future Events
                    </Button>

                    <Button
                        onClick={() => setPredicate("past")}
                        gradientDuoTone="cyanToBlue"
                    >
                        Past Events
                    </Button>
                </ButtonGroup>
                <NavLink to={`/profile/${username}`} >
                    <Button outline>
                        <HiOutlineArrowLeft className="h-6 w-6" />
                    </Button>
                </NavLink>
            </div>
            {profileEventsList}
        </article>
    );

    return content;
};

export default ProfileEvents;