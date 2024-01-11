import { useField } from 'formik';
import { Checkbox, Label } from 'flowbite-react';

const CustomCheckbox = (props) => {
    const [field, meta] = useField(props);

    const content = (
        <div className="flex items-center gap-2">
            <Checkbox
                {...field}
                {...props}
            />
            <Label
                htmlFor={props.name}
                value={props.label}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    );

    return content;
};
export default CustomCheckbox;