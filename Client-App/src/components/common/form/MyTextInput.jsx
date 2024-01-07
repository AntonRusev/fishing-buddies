import { useField } from 'formik';
import { Label, TextInput } from 'flowbite-react';

const MyTextInput = (props) => {
    const [field, meta] = useField(props.name);

    const content = (
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor={props.name}
                    value={props.label}
                />
            </div>
            <TextInput
                {...field}
                {...props}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </div>
    );

    return content;
};

export default MyTextInput;