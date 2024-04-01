import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";

import { useLazyResendEmailConfirmQuery, useVerifyEmailMutation } from "./authApiSlice";
import useQuery from "../../app/util/hooks";

import { MdEmail } from "react-icons/md";

const ConfirmEmail = () => {
    const navigate = useNavigate();

    const email = useQuery().get("email");
    const token = useQuery().get("token");

    const [
        verifyEmail,
        {
            isFetching,
            isLoading,
            isSuccess,
            isError
        }
    ] = useVerifyEmailMutation();

    const [trigger] = useLazyResendEmailConfirmQuery();

    // Confirming the verification of the email
    useEffect(() => {
        if (email && token) {
            verifyEmail({ email, token })
                .unwrap()
                .catch((error) => console.log(error));
        };
    }, [email, token]);

    // Confirmation link resender handler
    const handleConfirmEmailResend = async () => {
        await trigger(email)
            .unwrap()
            .then(() => toast.success("Verification email resent- please check your email"))
            .catch((error) => console.log(error));
    };

    let content;

    if (isLoading || isFetching) {
        // Processing verification
        content = (
            <p>Verifying...</p>
        );
    } else if (isSuccess) {
        // Upon verification success
        content = (
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2 text-green-500 dark:text-green-400">
                    {/* TITLE */}
                    <MdEmail className="text-4xl font-bold tracking-wide" />
                    <h4 className="text-xl font-bold tracking-wide">Success!</h4>
                </div>

                <p>Email has been verified - you can now login.</p>

                <Button onClick={() => navigate("/login")}>
                    Login
                </Button>
            </div>
        );
    } else if (isError) {
        // Upon verification failure
        content = (
            <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2 text-red-500 dark:text-red-400">
                    {/* TITLE */}
                    <MdEmail className="text-4xl font-bold tracking-wide" />
                    <h4 className="text-xl font-bold tracking-wide">Verification failed.</h4>
                </div>

                {/* MESSAGE */}
                <p>You can try resending the verify link to your email.</p>

                {/* RESEND BUTTON */}
                <Button
                    className="tracking-wide uppercase font-bold"
                    onClick={() => handleConfirmEmailResend()}
                >
                    Resend email
                </Button>
            </div>
        );
    };

    return (
        <section className="flex justify-center h-full mx-4 px-4 my-auto py-8 rounded font-lato text-center bg-gray-100 text-gray-700 md:px-16 lg:mx-auto dark:bg-gray-800 dark:text-gray-300">
            {content}
        </section>
    );
};

export default ConfirmEmail;