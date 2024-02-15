import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from 'formik';

import { selectCurrentToken } from "../auth/authSlice";
import { startSignalRConnection, stopSignalRConnection, addComment, selectComments } from "../comments/commentsSlice";

import { CustomTextArea, CustomButton } from "../../components/common/form";
import ChatBubble from "../../components/common/ChatBubble";
import { commentSchema } from "../../utils/schemas";

const EventDetailedChat = ({ eventId }) => {
    const dispatch = useDispatch();

    const comments = useSelector(selectComments);
    const token = useSelector(selectCurrentToken);

    useEffect(() => {
        if (eventId && token) {
            // If there is logged in user, connect to this group Hub(with the name of the event Id)
            dispatch(startSignalRConnection(eventId, token));
        };

        // Upon dismount stop the connection to the current group Hub
        return () => {
            dispatch(stopSignalRConnection());
        };
    }, [eventId, token,  stopSignalRConnection, startSignalRConnection]);

    const handleSubmit = async (values, actions) => {
        try {
            // using params: body and eventId
            const { body } = values;
            dispatch(addComment(body, eventId));

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
                                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                                name="body"
                                label="Your Comment"
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && e.shiftKey) {
                                        return;
                                    }
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        isValid && handleSubmit();
                                    }
                                }}
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
                    comments?.length > 0
                        ? comments.map(c => (
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