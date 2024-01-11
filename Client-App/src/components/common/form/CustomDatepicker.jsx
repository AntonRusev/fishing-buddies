import { useField } from 'formik';
import { Datepicker } from 'flowbite-react';

const CustomDatepicker = (props) => {
    const [field, meta, { setValue }] = useField(props.name);

    const content = (
        <>
            <Datepicker
                {...field}
                {...props}
                onSelectedDateChanged={value => setValue(value)} // Custom onChangeHandler coming from Flowbite-React
                color={
                    meta.touched && meta.error
                        ? "failure" // If field is touched and validation error - red background
                        : meta.touched && "success" // If field is touched but no validation error - green background
                }
            />
            {meta.touched && meta.error
                ? <Label>{meta.error}</Label>
                : null
            }
        </>
    );

    return content;
};

export default CustomDatepicker;