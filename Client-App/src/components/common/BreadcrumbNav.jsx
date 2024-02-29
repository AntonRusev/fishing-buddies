import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'flowbite-react';
import { format } from "date-fns";

import { selectFilterParams } from '../../features/events/eventsSlice';

import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

import { HiCollection } from "react-icons/hi";

const BreadcrumbNav = () => {
    const { pathname } = useLocation();

    // Getting Event filters(and start date) that are selected by the User
    const filterParams = useSelector(selectFilterParams);

    // Getting the string between the first and second "/" in pathname
    const pathString = pathname.split('/')[1];

    const content = (
        <Breadcrumb
            aria-label="breadcrumb"
            className="w-full px-5 py-3 dark:bg-gray-800"
        >
            {/* PATH */}
            <Breadcrumb.Item icon={HiCollection}>
                {capitalizeFirstLetter(pathString)}
            </Breadcrumb.Item>

            {/* FILTER PARAMETER */}
            <Breadcrumb.Item>
                {/* If no filter is selected, show the default "All" */}
                {(filterParams.all === true || (!filterParams.ishost && !filterParams.isgoing))
                    && "All"}
                {filterParams.ishost && "Host"}
                {filterParams.isgoing && "Going"}
            </Breadcrumb.Item>

            {/* STARTING DATE */}
            <Breadcrumb.Item>
                Starting "
                {filterParams.startDate
                    ? format(filterParams.startDate, 'dd-MMM-yyyy')
                    : format(new Date(), 'dd-MMM-yyyy')
                }
                "
            </Breadcrumb.Item>
        </Breadcrumb>
    );

    return content;
};

export default BreadcrumbNav;