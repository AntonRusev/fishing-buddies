import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from 'formik';
import { v4 as uuid } from 'uuid';

import { useCreateEventMutation, useEditEventMutation, useGetEventQuery } from "./eventsApiSlice";

import { CustomTextInput, CustomButton, CustomTextArea, CustomSelectInput, CustomDatepicker } from "../../components/common/form";

import { eventSchema } from "../../utils/schemas";
import { categoryOptions } from "../../utils/options/categoryOptions";
import getCentralTimeDate from "../../utils/getCentralTimeDate";

let EventForm = () => {
    const [event, setEvent] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: new Date(),
        region: '',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    let fishingEvent;
    if (id) {
        const { data } = useGetEventQuery(id);
        fishingEvent = data;
    };

    const [createEvent] = useCreateEventMutation();
    const [editEvent] = useEditEventMutation();

    useEffect(() => {
        // If editing an Event, populate the input fields with the existing properties
        if (id && fishingEvent) {
            setEvent({
                id: fishingEvent.id,
                title: fishingEvent.title,
                category: fishingEvent.category,
                description: fishingEvent.description,
                date: fishingEvent.date,
                region: fishingEvent.region,
            });
        };
    }, [fishingEvent]);

    const handleSubmit = async (values, actions) => {
        try {
            // Parsing the date to UTC time
            const customDate = getCentralTimeDate(values.date);

            if (id) {
                // If there is an Id, Editing the Event
                await editEvent({ ...values, date: customDate })
                    .unwrap()
                    .then(setTimeout(() => {
                        // delay before navigating to the newly created event
                        navigate(`/events/${id}`);
                    }, "1000"));
            } else {
                // If there is no Id, generating one and Creating an Event
                const newId = uuid();
                await createEvent({ ...values, date: customDate, id: newId })
                    .unwrap()
                    .then(setTimeout(() => {
                        // delay before navigating to the newly created event
                        navigate(`/events/${newId}`);
                    }, "1000"));
            };

            actions.resetForm();
        } catch (err) {
            console.log(err);
        };
    };

    const content = (
        <section className="p-2 mt-10 dark:bg-gray-900">
            <Formik
                validationSchema={eventSchema}
                enableReinitialize
                initialValues={event}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <>
                        <Form
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="flex max-w-md flex-col gap-4 mx-auto"
                        >
                            {/* TITLE */}
                            <CustomTextInput
                                placeholder="Fishing with buddies"
                                name="title"
                                label="Event title"
                            />

                            {/* DESCRIPTION */}
                            <CustomTextArea
                                placeholder="Makarel fishing"
                                name="description"
                                label="Event description"
                            />

                            {/* CATEGORY */}
                            <CustomSelectInput
                                name="category"
                                label="Category"
                                options={categoryOptions}
                            />

                            {/* REGION */}
                            <CustomTextInput
                                placeholder="Burgas"
                                name="region"
                                label="Region"
                            />

                            {/* DATE */}
                            <CustomDatepicker
                                name='date'
                                minDate={new Date()}
                                weekStart={1} // Monday
                                title="Event Date"
                            />

                            {/* SUBMIT */}
                            <CustomButton
                                isValid={isValid}
                                dirty={dirty}
                                isSubmitting={isSubmitting}
                                value={
                                    // If there is Event Id, the Event is being edited, otherwise it is being created
                                    event.id
                                        ? 'Edit'
                                        : 'Create'
                                }
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </section>
    );

    return content;
};

EventForm = React.memo(EventForm);

export default EventForm;