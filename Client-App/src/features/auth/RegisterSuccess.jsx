import { toast } from "react-toastify";
import { Button } from "flowbite-react";

import { useLazyResendEmailConfirmQuery } from "./authApiSlice";
import useQuery from "../../app/util/hooks";

import { FaCheckCircle } from "react-icons/fa";

const RegisterSuccess = () => {
    const email = useQuery().get("email");
    const [trigger] = useLazyResendEmailConfirmQuery();

    // Confirmation link resender handler
    const handleConfirmEmailResend = async () => {
        await trigger({ email })
            .unwrap()
            .then(() => toast.success("Verification email resent- please check your email"))
            .catch((error) => console.log(error));
    };

    return (
        <section className="flex justify-center h-full mx-4 px-4 my-auto py-8 rounded font-lato text-center bg-gray-100 text-gray-700 md:px-8 lg:mx-auto dark:bg-gray-800 dark:text-gray-300">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4 text-green-500 dark:text-green-400">
                    {/* TITLE */}
                    <FaCheckCircle className="text-4xl font-bold tracking-wide" />
                    <h4 className="text-xl font-bold tracking-wide">Registration successful!</h4>
                </div>

                {/* MESSAGE */}
                <p>Thank you for registering with Fishing Buddies. Before you can access your profile, we need to verify your email address.</p>
                <p>Please, check your email (including junk email) for the verification email.</p>

                {/* RESEND EMAIL */}
                {email &&
                    <div className="flex flex-col items-center pt-6 gap-4">
                        <p className="italic">Didn't receive the email? Click the below button to resend.</p>
                        
                        {/* RESEND BUTTON */}
                        <Button
                            className="tracking-wide uppercase font-bold"
                            onClick={() => handleConfirmEmailResend()}
                        >
                            Resend email
                        </Button>
                    </div>
                }
            </div>
        </section>
    );
};

export default RegisterSuccess;