import { Spinner } from 'flowbite-react';

const CustomSpinner = ({text = "Loading..."}) => {
    const content = (
        <div className="flex flex-col items-center justify-center h-fit w-full">
            <Spinner size="xl" />
            <p className='text-gray-500 italic pt-2 dark:text=gray-200'>
                {/* Custom Text */}
                {text}
            </p>
        </div>
    );

    return content;
};

export default CustomSpinner