import { NavLink } from "react-router-dom";

const ChatBubble = ({ comment }) => {
    const content = (
        <div className="flex items-start gap-2.5 my-2">
            <NavLink to={`/profiles/${comment.username}`}>
                <img className="w-8 h-8 rounded-full" src={comment.image} alt="Avatar image" />
            </NavLink>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <NavLink to={`/profiles/${comment.username}`}>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.username}</span>
                    </NavLink>
                    {/* TODO fix the timestamp to show "time ago" */}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{comment.body}</p>
                {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
            </div>
        </div>
    );

    return content;
};

export default ChatBubble;