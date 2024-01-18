import { useNavigate } from 'react-router-dom';

import { Button } from 'flowbite-react';

const ServerError = () => {
    const navigate = useNavigate();

    const content = (
        <div
            className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center dark:bg-gray-900"
        >
            <div
                className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl dark:bg-gray-700"
            >
                <p
                    className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-300 mt-4"
                >
                    Error: 500 
                </p>
                <p
                    className="text-gray-500 mt-4 pb-4 border-b-2 text-center"
                >Internal Server Error has occured.
                </p>
                <Button
                    // Replacing the current entry in the history stack, instead of adding a new one
                    // (User can't go back to the Not Found page by clicking the Back button on the browser)
                    onClick={() => navigate('/', { replace: true })}
                    className="mt-6"
                >
                    Return Home
                </Button>
            </div>
        </div>
    );

    return content;
};

export default ServerError;