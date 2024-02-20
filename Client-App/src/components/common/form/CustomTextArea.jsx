import { useField } from 'formik';
import { Label, Textarea } from 'flowbite-react';

const CustomTextArea = (props) => {
    const [field, meta] = useField(props.name);

    const content = (
        <div>
            <div className="mb-2 block">
                <Label
                    htmlFor={props.name}
                    value={props.label}
                />
            </div>
            <Textarea
                {...field}
                {...props}
                color={
                    meta.touched && meta.error
                        ? "failure" // If field is touched and validation error - red background
                        : meta.touched && "success" // If field is touched but no validation error - green background
                }
                helperText={
                    <>
                        {/* In case of validation error show message */}
                        {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                    </>
                }
                required
                rows={4}
            />
        </div>
    );

    return content;
};

export default CustomTextArea;