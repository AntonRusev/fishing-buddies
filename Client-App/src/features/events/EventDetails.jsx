import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useDeleteEventMutation, useGetEventQuery, useUpdateAttendanceMutation } from "./eventsApiSlice";
import { selectCurrentUser } from "../auth/authSlice";

import BreadcrumbNav from "../../components/common/Breadcrumb";

import { Button, Spinner } from 'flowbite-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const {
        data: fishingEvent,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetEventQuery(id);

    const [updateAttendance] = useUpdateAttendanceMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const user = useSelector(selectCurrentUser);

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id).unwrap();
    };
    const handleDeleteEvent = async () => {
        try {
            if (id) {
                await deleteEvent(id).unwrap();
            };
            navigate('/events');
        } catch (err) {
            console.log(err);
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
                            {fishingEvent.attendees.map(a => (
                                <li key={a.username}>
                                    {a.username}
                                </li>
                            ))}
                        </ul>
                        <Button onClick={handleAttendanceSubmit} size="sm">Attend</Button>
                        <Button onClick={handleDeleteEvent} size="sm">Remove</Button>
                        {fishingEvent.hostUsername === user
                            ? <Button
                                as={NavLink}
                                to={`/manage/${id}`}
                                size="sm"
                                className='mx-auto'
                            >Manage
                            </Button>
                            : ""
                        }
                    </div>
                </article>
            </>
        );
    } else if (isError) {
        content = (<p>{JSON.stringify(error)}</p>);
    };

    return content;
};

export default EventDetails;