import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from 'formik';
import { v4 as uuid } from 'uuid';

import { useCreateEventMutation, useEditEventMutation, useGetEventQuery } from "./eventsApiSlice";

import { CustomTextInput, CustomButton, CustomTextArea, CustomSelectInput, CustomDatepicker } from "../../components/common/form";
import BreadcrumbNav from "../../components/common/Breadcrumb";

import { eventSchema } from "../../utils/schemas";
import { categoryOptions } from "../../utils/options/categoryOptions";

const EventForm = () => {
    const [event, setEvent] = useState({
        id: undefined,
        title: '',
        category: '',
        description: '',
        date: new Date(),
        region: '',
    });

    const navigate = useNavigate();

    const { id } = useParams();
    const { data: fishingEvent } = useGetEventQuery(id);

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
            if (id) {
                // If there is an Id, Editing the Event
                await editEvent({ ...values }).unwrap();
            } else {
                // If there is no Id, generating one and Creating an Event
                const newId = uuid();
                await createEvent({ newId, ...values }).unwrap();
            };

            actions.resetForm();
            navigate('/events');
        } catch (err) {
            console.log(err);
        };
    };

    const content = (
        <Formik
            validationSchema={eventSchema}
            enableReinitialize
            initialValues={event}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <>
                    <BreadcrumbNav />
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

                        {/* DATE */}
                        <CustomDatepicker
                            name='date'
                            minDate={new Date()}
                            weekStart={1} // Monday
                            title="Event Date"
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
    );

    return content;
};

export default EventForm;