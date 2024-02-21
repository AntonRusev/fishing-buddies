import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from 'flowbite-react';

import { useDeleteEventMutation, useUpdateAttendanceMutation } from "../eventsApiSlice";
import { selectCurrentImage, selectCurrentUser } from "../../auth/authSlice";
import { openModal, closeModal, setConfirmOptions, resetConfirmOptions } from "../../modals/modalsSlice";

import ModalConfirm from "../../modals/ModalConfirm";

const EventDetailedButtons = ({ fishingEvent }) => {
    const [isAttending, setIsAttending] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const image = useSelector(selectCurrentImage);
    const [updateAttendance, { isLoading: updateAttendIsLoading }] = useUpdateAttendanceMutation();
    const [deleteEvent, { isLoading: deleteIsLoading }] = useDeleteEventMutation();

    useEffect(() => {
        // Check if viewing User is attending the Event
        const attendance = fishingEvent.attendees.some(attendee => attendee.username === user);

        if (attendance) {
            setIsAttending(true);
        } else {
            setIsAttending(false);
        };
    }, [fishingEvent]);

    // Handle ATTEND
    const handleAttendanceSubmit = async () => {
        await updateAttendance({ eventId: fishingEvent.id, user, image })
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
                {user === fishingEvent.hostUsername
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
                    :
                    // If the User is NOT Host of the Event
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
                {fishingEvent.hostUsername === user &&
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
                {fishingEvent.hostUsername === user &&
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