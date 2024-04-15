import { useState } from 'react';
import { Banner } from 'flowbite-react';

import { HiArrowRight, HiX } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const CustomBanner = () => {
    const [showBanner, setShowBanner] = useState(true);

    if (showBanner) {
        return (
            <article className='w-full mt-4 -mb-4 mx-auto xl:max-w-screen-xl'>
                <Banner>
                    <div className="flex w-full flex-col justify-between rounded border-b border-gray-200 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-700 md:flex-row">
                        <div className="mb-4 md:mb-0 md:mr-4">
                            <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                                Experience all features
                            </h2>
                            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                                In order to get access to all features this application has to offer, you have to be signed in.
                            </p>
                        </div>
                        <div className="flex flex-shrink-0 items-center">
                            <NavLink
                                to='/register'
                                className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                            >
                                Register
                            </NavLink>
                            <NavLink
                                to='/login'
                                className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            >
                                Login
                                <HiArrowRight className="ml-2 h-4 w-4" />
                            </NavLink>
                            <Banner.CollapseButton
                                onClick={() => setShowBanner(false)}
                                className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
                                color="gray"
                            >
                                <HiX className="h-4 w-4" />
                            </Banner.CollapseButton>
                        </div>
                    </div>
                </Banner>
            </article>
        );
    };

    return;
};

export default CustomBanner;