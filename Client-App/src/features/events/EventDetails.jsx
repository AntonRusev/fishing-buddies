import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { useGetEventQuery, useUpdateAttendanceMutation } from "./eventsApiSlice";
import { selectCurrentUser } from "../auth/authSlice";

import { Button } from 'flowbite-react';
import BreadcrumbNav from "../../components/common/Breadcrumb";

const EventDetails = () => {
    const { id } = useParams();

    const { data: fishingEvent } = useGetEventQuery(id);
    const [updateAttendance] = useUpdateAttendanceMutation();
    const user = useSelector(selectCurrentUser);

    const handleAttendanceSubmit = async () => {
        await updateAttendance(fishingEvent.id).unwrap();
    };

    let content;

    if (fishingEvent) {
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
    }


    return content;
};

export default EventDetails;