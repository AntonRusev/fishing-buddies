import { Checkbox, Label } from 'flowbite-react';

const MyCheckbox = ({ handler }) => {
    const content = (
        <div className="flex items-center gap-2">
            <Checkbox id="remember" onChange={handler} />
            <Label htmlFor="remember">Remember me</Label>
        </div>
    );

    return content;
};
export default MyCheckbox;