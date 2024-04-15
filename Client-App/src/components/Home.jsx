import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from 'flowbite-react';

import { selectUser } from "../features/auth/authSlice";

import CustomBanner from "./common/CustomBanner";

const Home = () => {
    const navigate = useNavigate();

    const user = useSelector(selectUser)

    const content = (
        <>
            {/* Show Login/Register Banner only if there is no authenticated User */}
            {!user.token && <CustomBanner />}
            
            <section className="mx-auto mt-8 p-4 rounded bg-gray-100 xl:max-w-screen-xl dark:bg-gray-800">
                <div
                    className="flex"
                    style={{ height: "600px" }}
                >
                    <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                        <div className="flex flex-col gap-y-4">
                            {/* TITLE */}
                            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl dark:text-white">
                                Welcome to <span className="text-cyan-600 font-serif">Fishing Buddies</span>!
                            </h2>
                            {/* DESCRIPTION */}
                            <p className="mt-2 text-sm text-gray-500 md:text-base">
                            In this social network for fishing enthusiasts, you can organize or attend events, connect and chat with like-minded people, and much more!
                            </p>
                            <div className="flex justify-center lg:justify-start mt-6">
                                {/* GO TO EVENTS BUTTON */}
                                <Button
                                    onClick={() => navigate('/events')}
                                    color='dark'
                                    size='lg'
                                >
                                    View the Events
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="hidden lg:block lg:w-1/2"
                        style={{ clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)" }}
                    >
                        {/* IMAGE */}
                        <img
                            className="object-cover rounded-tr-lg rounded-br-lg h-full w-full"
                            src='/landing.jpg'
                            alt="landing image"
                        />
                    </div>
                </div>
            </section>
        </>
    );

    return content;
};

export default Home;