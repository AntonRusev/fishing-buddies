import { useParams } from "react-router-dom";

import { Button } from 'flowbite-react';

import { useGetEventQuery, useUpdateAttendanceMutation } from "./eventsApiSlice";
import BreadcrumbNav from "../../components/common/Breadcrumb";

const EventDetails = () => {
    const { id } = useParams();

    const { data: fishingEvent } = useGetEventQuery(id);
    const [updateAttendance] = useUpdateAttendanceMutation();

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
                        <Button onClick={handleAttendanceSubmit} size="xs">Attend</Button>
                    </div>
                </article>
            </>

        );
    }


    return content;
};

export default EventDetails;