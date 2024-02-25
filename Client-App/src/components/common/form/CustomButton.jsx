import { Button } from 'flowbite-react';

const CustomButton = (props) => {
    const { isValid, dirty, isSubmitting, value } = props;
    const content = (
        <Button
            disabled={!isValid || !dirty || isSubmitting}
            isProcessing={isSubmitting}
            type="submit"
            // className='mx-auto'
            className='flex-grow'
        >
            {value}
        </Button>
    );

    return content;
};

export default CustomButton;