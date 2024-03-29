import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from "date-fns";
import { Datepicker } from 'flowbite-react';

import { selectFilters, setStartDate } from './eventsSlice';

import CustomSpinner from '../../components/common/CustomSpinner';
import getCentralTimeDate from '../../utils/getCentralTimeDate';

const EventDatepicker = () => {
    const [chosenDate, setChosenDate] = useState();

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    useEffect(() => {
        // Take startDate from global state and use it as default date, 
        // or set "today" as default date
        if (filters.startDate) {
            let [day, month, year] = format(filters.startDate, 'd M yyyy').split(' ');
            // Months start from 0, instead of 1, so January is 0 and December is 11
            setChosenDate(new Date(Number(year), Number(month) - 1, Number(day)));
        } else {
            setChosenDate(new Date());
        };
    }, [filters]);

    let content;

    if (chosenDate) {
        content = (
            <Datepicker
                inline
                title="Filter by Starting Date"
                weekStart={1} // Monday
                defaultDate={chosenDate}
                onSelectedDateChanged={(value) => {
                    dispatch(setStartDate(getCentralTimeDate(value)));
                }} // Custom onChangeHandler coming from Flowbite-React
            />
        );
    } else {
        content = (
            <CustomSpinner />
        );
    };

    return content;
};

export default EventDatepicker;