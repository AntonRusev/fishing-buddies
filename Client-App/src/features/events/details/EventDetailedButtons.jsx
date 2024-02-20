import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from 'flowbite-react';

import { useDeleteEventMutation, useUpdateAttendanceMutation } from "../eventsApiSlice";
import { selectCurrentImage, selectCurrentUser } from "../../auth/authSlice";

import DeleteModal from "../../../components/common/modals/deleteModal";

const EventDetailedButtons = ({ fishingEvent }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isAttending, setIsAttending] = useState(false);

    const navigate = useNavigate();

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
                .then(setOpenDeleteModal(false))
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
                        // size="sm"
                        // className='mx-auto'
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
                        onClick={() => setOpenDeleteModal(true)}
                        // size="sm"
                        isProcessing={deleteIsLoading}
                        disabled={updateAttendIsLoading || deleteIsLoading}
                        color="failure"
                        className="flex-grow font-semibold"
                    >
                        Remove
                    </Button>
                }
            </div>

            {/* DELETE MODAL */}
            {openDeleteModal &&
                <DeleteModal
                    trigger={openDeleteModal}
                    closeModal={setOpenDeleteModal}
                    deleteHandler={handleDeleteEvent}
                    textString={"event"}
                />
            }
        </>
    );

    return content;
};

export default EventDetailedButtons;