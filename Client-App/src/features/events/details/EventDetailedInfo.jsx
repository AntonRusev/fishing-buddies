import { useDispatch } from 'react-redux';
import { format } from "date-fns";
import { Button } from 'flowbite-react';

import { openModal, setModalOptions } from '../../modals/modalsSlice';

import ModalOptions from "../../modals/ModalOptions";

import { ImInfo } from "react-icons/im";
import { GoLocation } from "react-icons/go";
import { MdCalendarToday } from "react-icons/md";
import { FaWater } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";

const EventDetailedInfo = ({ fishingEvent }) => {
    const dispatch = useDispatch();

    const content = (
        <div className="flex justify-center my-4">
            <ul className="bg-gray-200 rounded w-96 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full">

                {/* DESCRIPTION */}
                <li className="flex items-center px-6 py-2 border-b border-gray-50 dark:border-gray-900 w-full rounded-t">
                    <span><ImInfo className='inline-block mr-4' /></span>
                    {fishingEvent.description}
                </li>

                {/* REGION */}
                <li className="flex items-center px-6 py-2 border-b border-gray-50 dark:border-gray-900 w-full">
                    <span><GoLocation className='inline-block mr-4' /></span>
                    {fishingEvent.region}
                </li>

                {/* CATEGORY */}
                <li className="flex items-center px-6 py-2 border-b border-gray-50 dark:border-gray-900 w-full">
                    <span><FaWater className='inline-block mr-4' /></span>
                    {fishingEvent.category === "flowing-freshwater"
                        ? "River fishing"
                        : fishingEvent.category === "calm-freshwater"
                            ? "Lake fishing"
                            : "Saltwater fishing"
                    }
                </li>

                {/* ATTENDEES */}
                {/* Small screen ONLY */}
                <li className="flex items-center place-content-between px-6 py-2 border-b border-gray-50 dark:border-gray-900 w-full lg:hidden ">
                    <div>
                        <span><SlPeople className='inline-block mr-4' /></span>
                        {fishingEvent.attendees.length === 1
                            ? "1 person going"
                            : `${fishingEvent.attendees.length} people going`
                        }
                    </div>
                    <Button
                        onClick={() => {
                            dispatch(setModalOptions('attendees'));
                            dispatch(openModal());
                        }}
                        size="xs"
                        color="gray"
                    >
                        Show Attendees
                    </Button>
                </li>

                {/* DATE */}
                <li className="flex items-center  px-6 py-2 w-full rounded-b">
                    <span><MdCalendarToday className='inline-block mr-4' /></span>
                    {format(fishingEvent.date, 'dd MMM yyyy')}
                </li>
            </ul >

            {/* MODAL */}
            {/* Small screen only (responsive design)*/}
            <ModalOptions fishingEvent={fishingEvent} />
        </div>
    );

    return content;
};

export default EventDetailedInfo;