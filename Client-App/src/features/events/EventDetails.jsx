import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDeleteEventMutation, useGetEventQuery, useUpdateAttendanceMutation } from "./eventsApiSlice";
import { selectCurrentUser } from "../auth/authSlice";

import { Button, Spinner, Avatar, Dropdown } from 'flowbite-react';
import EventDetailedChat from "./EventDetailedChat";
import BreadcrumbNav from "../../components/common/BreadcrumbNav";
import ProfileCard from "../profiles/ProfileCard";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: fishingEvent,
        isFetching,
        isSuccess,
    } = useGetEventQuery(id);

    const [updateAttendance, { isLoading: updateAttendIsLoading }] = useUpdateAttendanceMutation();
    const [deleteEvent, { isLoading: deleteIsLoading }] = useDeleteEventMutation();

    const user = useSelector(selectCurrentUser);

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id)
            .unwrap();
    };
    const handleDeleteEvent = async () => {
        if (id) {
            await deleteEvent(id)
                .unwrap()
                .then(navigate('/events'))
                .catch((error) => console.log(error));
        };
    };

    let content;

    if (isFetching) {
        content = (<Spinner aria-label="Extra large spinner example" size="xl" />);
    } else if (isSuccess && fishingEvent) {
        content = (
            <>
                <BreadcrumbNav title={fishingEvent.title} />
                <article>
                    <h4>{fishingEvent.title}</h4>
                    <p>{fishingEvent.date}</p>
                    <p>{fishingEvent.description}</p>
                    <p>Category: {fishingEvent.category}</p>
                    <p>Region: {fishingEvent.region}</p>
                    <p>Hosted by {fishingEvent.hostUsername}</p>
                    <p>
                        Active:
                        {fishingEvent.isCancelled
                            ? "is cancelled"
                            : "is active"
                        }
                    </p>
                    <div>
                        Attended by:
                        <ul>
                            {fishingEvent.attendees.map(attendee => (
                                <li key={attendee.username} >
                                    <Dropdown
                                        label={<Avatar alt="User settings" img={attendee.image} rounded />}
                                        arrowIcon={false}
                                        inline
                                    >
                                        <ProfileCard profile={attendee} />
                                    </Dropdown>
                                </li>
                            ))}
                        </ul>

                        {/* ATTEND BUTTON */}
                        {user &&
                            <Button
                                onClick={handleAttendanceSubmit}
                                size="sm"
                                isProcessing={updateAttendIsLoading}
                            >
                                Attend
                            </Button>
                        }

                        {/* EDIT AND DELETE BUTTONS */}
                        {fishingEvent.hostUsername === user
                            ? <>
                                <Button
                                    onClick={handleDeleteEvent}
                                    size="sm"
                                    isProcessing={deleteIsLoading}
                                >
                                    Remove
                                </Button>
                                <Button
                                    as={NavLink}
                                    to={`/manage/${id}`}
                                    size="sm"
                                    className='mx-auto'
                                >
                                    Manage
                                </Button>
                            </>

                            : ""
                        }
                    </div>

                    {/* CHAT */}
                    {/* Only shown to logged in users */}
                    {user && <EventDetailedChat eventId={fishingEvent.id} />}

                </article>
            </>
        );
    };

    return content;
};

export default EventDetails;