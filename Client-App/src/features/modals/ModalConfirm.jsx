import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'flowbite-react';

import { closeModal, resetConfirmOptions, selectChosenConfirm, selectModalActive } from './modalsSlice';

import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ModalConfirm = ({ deleteHandler }) => {
    const dispatch = useDispatch();
    const modalActive = useSelector(selectModalActive);
    const chosenConfirm = useSelector(selectChosenConfirm);

    {/* Show the Modal only if its activated AND one of the available confirm options is selected(event, photo) */ }
    const content = (
        <Modal
            show={modalActive && chosenConfirm}
            size="md"
            onClose={() => {
                dispatch(resetConfirmOptions());
                dispatch(closeModal());
            }}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                    {/* Confirm Text */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this {chosenConfirm}?
                    </h3>

                    <div className="flex justify-center gap-4">
                        {/* CONFIRM BUTTON */}
                        <Button
                            color="failure"
                            onClick={() => deleteHandler()}
                        >
                            {"Yes, I'm sure"}
                        </Button>

                        {/* CANCEL BUTTON */}
                        <Button
                            color="gray"
                            onClick={() => {
                                dispatch(resetConfirmOptions());
                                dispatch(closeModal());
                            }}
                        >
                            No, cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );

    return content;
};

export default ModalConfirm;