import { useField } from 'formik';
import { Checkbox, Label } from 'flowbite-react';

const MyCheckbox = (props) => {
    const [field, meta] = useField(props);

    const content = (
        <div className="flex items-center gap-2">
            <Checkbox
                {...field}
                {...props}
                id="remember"
            />
            <Label htmlFor="remember">Remember me</Label>
            {/* TODO Sort the error div */}
            {meta.touched && meta.error && <div className="error">{meta.error}</div>} 
        </div>
    );

    return content;
};
export default MyCheckbox;