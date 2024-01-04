import { useState } from "react";

import { v4 as uuid } from 'uuid';
import { useCreateEventMutation, useDeleteEventMutation, useEditEventMutation } from "./eventsApiSlice";

const EventForm = () => {
    const [event, setEvent] = useState();
    const [editedEvent, setEditedEvent] = useState();

    const [createEvent] = useCreateEventMutation();
    const [editEvent] = useEditEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const createStateEvent = () => {
        const newId = uuid();
        const dateNow = new Date().toISOString();

        setEvent({
            id: newId,
            title: 'Create Test Title',
            category: 'flowing-freshwater',
            description: 'Some text here',
            date: dateNow,
            region: 'Plovdiv',
        });
    };

    const editStateEvent = (eventId) => {
        const dateNow = new Date().toISOString();

        setEditedEvent({
            id: '9ab429a9-09bb-4f54-83b2-1604fc932545',
            title: 'Create EDIT  Title',
            category: 'flowing-freshwater',
            description: 'Some EDIT text here',
            date: dateNow,
            region: 'Varna',
        });
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();

        try {
            await createEvent(event).unwrap();
        } catch (err) {
            console.log(err);
        };
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await editEvent(editedEvent).unwrap();
        } catch (err) {
            console.log(err);
        };
    };

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();

        const id = '9ab429a9-09bb-4f54-83b2-1604fc932545';

        try {
            await deleteEvent(id).unwrap();
        } catch (err) {
            console.log(err);
        };
    };

    const content = (
        <section>
            <button onClick={createStateEvent}>Click</button>
            <button onClick={editStateEvent}>Click Edit</button>
            <button onClick={() => console.log(event)}>Console Log</button>
            <button onClick={() => console.log(editedEvent)}>Console Log Edit</button>
            <button onClick={handleEventSubmit}>CREATE</button>
            <button onClick={handleEditSubmit}>EDIT</button>
            <button onClick={handleDeleteSubmit}>DELETE</button>
        </section>
    );

    return content;
};

export default EventForm;
