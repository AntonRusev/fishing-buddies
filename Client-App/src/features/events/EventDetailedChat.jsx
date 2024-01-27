import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from 'formik';

import { createHubConnection, stopHubConnection, selectAllComments, setComments, addComment, selectHubConnection, updateComments } from "../comments/commentsSlice";
import { selectCurrentToken } from "../auth/authSlice";

import { CustomTextArea, CustomButton } from "../../components/common/form";
import { commentSchema } from "../../utils/schemas";
import ChatBubble from "../../components/common/ChatBubble";

const EventDetailedChat = ({ eventId }) => {
    const [eventComments, setEventComments] = useState([]);

    const dispatch = useDispatch();

    const token = useSelector(selectCurrentToken);
    const hubConnection = useSelector(selectHubConnection);

    useEffect(() => {
        if (eventId && token) {
            dispatch(createHubConnection({ eventId, token }));
        };

        // Upon dismount stop the connection to the current Hub
        return () => {
            dispatch(stopHubConnection());
        };
    }, [eventId, dispatch]);

    useEffect(() => {
        if (hubConnection) {
            hubConnection.on('LoadComments', (comments) => {
                if (comments.length > 0) {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt);
                    });
                    const sorted = comments.sort((a, b) => b.createdAt - a.createdAt);
                    setEventComments(sorted);
                };
            });

            hubConnection.on('ReceiveComment', (comment) => {
                if (comment) {
                    comment.createdAt = new Date(comment.createdAt);
                    setEventComments(state => [comment, ...state]);
                };
            });
        };
    }, [hubConnection]);

    const handleSubmit = async (values, actions) => {
        try {
            // using params: body and eventId
            const { body } = values;
            dispatch(addComment({ body, eventId }));

            actions.resetForm();
        } catch (err) {
            console.log(err);
        };
    };

    const content = (
        <section>
            <h4>Chat Board:</h4>
            <Formik
                initialValues={{ body: '' }}
                validationSchema={commentSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <>
                        <Form
                            onSubmit={handleSubmit}
                            autoComplete='off'
                            className="flex max-w-md flex-col gap-4 mx-auto dark:bg-gray-900"
                        >
                            {/* Add Comment TEXT AREA */}
                            <CustomTextArea
                                // placeholder="Add Comment"
                                name="body"
                                label="Your Comment"
                            />
                            {/* SUBMIT */}
                            <CustomButton
                                isValid={isValid}
                                dirty={dirty}
                                isSubmitting={isSubmitting}
                                value={"Add Comment"}
                            />
                        </Form>
                    </>
                )}
            </Formik>
            <div>
                {
                    eventComments?.length > 0
                        ? eventComments.map(c => (
                            <ChatBubble key={c.id} comment={c} />
                        ))
                        : 'No comments'
                }
            </div>
        </section>
    );

    return content;
};

export default EventDetailedChat;