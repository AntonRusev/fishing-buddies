import { useEffect, useState } from 'react';
import { useField } from 'formik';
import { Datepicker } from 'flowbite-react';
import { format } from "date-fns";
import CustomSpinner from '../CustomSpinner';

const CustomDatepicker = (props) => {
    const [selectedDate, setSelectedDate] = useState();
    const [field, meta, { setValue }] = useField(props.name);

    useEffect(() => {
        // Take defaultDate from props, 
        // or set "today" as defaultDate
        if (props.defaultDate) {
            let [day, month, year] = format(props.defaultDate, 'd M yyyy').split(' ');
            // Months start from 0, instead of 1, so January is 0 and December is 11
            setSelectedDate(new Date(Number(year), Number(month) - 1, Number(day)));
        } else {
            setSelectedDate(new Date());
        };
    }, [props.defaultDate]);

    let content

    if (selectedDate) {
        content = (
            <>
                <Datepicker
                    className='mx-auto'
                    {...field}
                    {...props}
                    onSelectedDateChanged={value => setValue(value)} // Custom onChangeHandler coming from Flowbite-React
                    color={
                        meta.touched && meta.error
                            ? "failure" // If field is touched and validation error - red background
                            : meta.touched && "success" // If field is touched but no validation error - green background
                    }
                    inline
                />
                {meta.touched && meta.error
                    ? <Label>{meta.error}</Label>
                    : null
                }
            </>
        );
    } else {
        content = (
            <CustomSpinner text={"Loading datepicker..."} />
        );
    };

    return content;
};

export default CustomDatepicker;