import { useField } from 'formik';
import { Label, Select } from 'flowbite-react';

const CustomTextInput = (props) => {
    const [field, meta] = useField(props.name);

    const content = (
        <div className="max-w-md">
            <div className="mb-2 block">
                <Label
                    htmlFor={props.name}
                    value={props.label}
                />
            </div>
            <Select
                {...field}
                {...props}
                color={
                    meta.touched && meta.error
                        ? "failure" // If field is touched and validation error - red background
                        : meta.touched && "success" // If field is touched but no validation error - green background
                }
            >
                {/* Default option */}
                <option disabled value="">(Select a category)</option>
                {/* Available options */}
                {props.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.text}</option>
                ))}
            </Select>
        </div>
    );

    return content;
};

export default CustomTextInput;