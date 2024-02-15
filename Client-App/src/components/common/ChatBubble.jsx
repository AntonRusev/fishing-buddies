import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

import { selectCurrentUser } from "../../features/auth/authSlice";

const ChatBubble = ({ comment }) => {
    const user = useSelector(selectCurrentUser);

    const content = (
        // If the viewing user is the author of the message 
        // show his comment in "right-to-left" format(mirrored)
        // with the property "dir" and value "rtl".
        // The default format is "ltr"(left to right).
        // All the places where it is used are marked with // DIR
        <div
            dir={comment.username === user ? "rtl" : "ltr"} // DIR
            className="flex items-start gap-2.5 my-2"
        >
            <NavLink to={`/profile/${comment.username}`}>
                {/* Avatar */}
                <img className="w-8 h-8 rounded-full" src={comment.image || "/user.png"} alt="User" />
            </NavLink>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 ">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span
                        dir='ltr' // DIR
                    >
                        <NavLink to={`/profile/${comment.username}`}>
                            {/* Username */}
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.username}</span>
                        </NavLink>

                        <span
                            dir='ltr' // DIR
                            className="text-sm font-normal text-gray-500 dark:text-gray-400"
                        >
                            {/* Comment CreatedAt */}
                            {/* &nbsp; = whitespace */}
                            &nbsp;{formatDistanceToNow(comment.createdAt)} ago
                        </span>
                    </span>
                </div>

                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    <span
                        dir='ltr' // DIR
                    >
                        {/* Comment's Message */}
                        {comment.body}
                    </span>
                </p>

                {/* For User's own messages only */}
                {comment.username === user
                    ? <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    : ""}
            </div>
        </div>
    );

    return content;
};

export default ChatBubble;