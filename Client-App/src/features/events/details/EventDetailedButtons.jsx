import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { compareAsc } from 'date-fns';
import { Button } from 'flowbite-react';

import { useDeleteEventMutation, useUpdateAttendanceMutation } from "../eventsApiSlice";
import { selectUser } from "../../auth/authSlice";
import { openModal, closeModal, setConfirmOptions, resetConfirmOptions } from "../../modals/modalsSlice";

import ModalConfirm from "../../modals/ModalConfirm";

const EventDetailedButtons = ({ fishingEvent }) => {
    const [isAttending, setIsAttending] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [updateAttendance, { isLoading: updateAttendIsLoading }] = useUpdateAttendanceMutation();
    const [deleteEvent, { isLoading: deleteIsLoading }] = useDeleteEventMutation();
    
    const navigate = useNavigate();

    // Checking if the Event has already passed(true or false)
    const pastEvent = (compareAsc(new Date(), fishingEvent.date)) > -1;

    useEffect(() => {
        // Check if viewing User is attending the Event
        const attendance = fishingEvent.attendees.some(attendee => attendee.username === user.username);

        if (attendance) {
            setIsAttending(true);
        } else {
            setIsAttending(false);
        };
    }, [fishingEvent]);

    // Handle ATTEND
    const handleAttendanceSubmit = async () => {
        await updateAttendance({
            eventId: fishingEvent.id,
            user: user.username,
            image: user.image
        })
            .unwrap();
    };

    // Handle DELETE
    const handleDeleteEvent = async () => {
        if (fishingEvent.id) {
            await deleteEvent(fishingEvent.id)
                .unwrap()
                .then(dispatch(resetConfirmOptions()))
                .then(dispatch(closeModal()))
                .then(navigate('/events'))
                .catch((error) => console.log(error));
        };
    };

    const content = (
        <>
            <div className="flex justify-stretch tracking-wider mt-2 gap-2">
                {/* ATTEND BUTTON */}
                {/* Only available for future events */}
                {user.username === fishingEvent.hostUsername && !pastEvent
                    ?
                    // If the User is Host of the Event
                    <Button
                        onClick={handleAttendanceSubmit}
                        size="sm"
                        isProcessing={updateAttendIsLoading}
                        disabled={updateAttendIsLoading || deleteIsLoading}
                        color="dark"
                        className="flex-grow font-semibold"
                    >
                        {fishingEvent.isCancelled === false
                            ? "Deactivate Event"
                            : "Activate Event"
                        }
                    </Button>
                    : user.username && !pastEvent &&
                    // If the User is authenticated and NOT Host of the Event
                    <Button
                        onClick={handleAttendanceSubmit}
                        size="sm"
                        isProcessing={updateAttendIsLoading}
                        disabled={updateAttendIsLoading || deleteIsLoading || fishingEvent.isCancelled}
                        color="dark"
                        className="flex-grow font-semibold"
                    >
                        {isAttending === true
                            ? "Cancel attendance"
                            : "Join Event"
                        }
                    </Button>
                }

                {/* EDIT BUTTON */}
                {/* If the User is Host of the Event */}
                {fishingEvent.hostUsername === user.username &&
                    <Button
                        as={NavLink}
                        to={`/manage/${fishingEvent.id}`}
                        className="flex-grow font-semibold"
                        disabled={updateAttendIsLoading || deleteIsLoading}
                        color="dark"
                    >
                        Edit
                    </Button>
                }
                {/* DELETE BUTTON */}
                {/* If the User is Host of the Event */}
                {fishingEvent.hostUsername === user.username &&
                    <Button
                        onClick={() => {
                            dispatch(setConfirmOptions('event'));
                            dispatch(openModal());
                        }}
                        isProcessing={deleteIsLoading}
                        disabled={updateAttendIsLoading || deleteIsLoading}
                        color="failure"
                        className="flex-grow font-semibold"
                    >
                        Remove
                    </Button>
                }
            </div>

            {/* DELETE CONFIRM MODAL */}
            <ModalConfirm deleteHandler={handleDeleteEvent} />
        </>
    );

    return content;
};

export default EventDetailedButtons;