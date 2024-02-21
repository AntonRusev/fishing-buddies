import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'flowbite-react';

import { closeModal, resetModalOptions, selectChosenOption, selectModalActive, selectModalOptions } from './modalsSlice';

import EventFilters from '../events/EventFilters';
import EventDatepicker from '../events/EventDatepicker';
import EventDetailedAttendees from '../events/details/EventDetailedAttendees';

const ModalOptions = ({ totalItems, fishingEvent }) => {
    const dispatch = useDispatch();
    const modalActive = useSelector(selectModalActive);
    const modalOptions = useSelector(selectModalOptions);
    const chosenOption = useSelector(selectChosenOption);

    const content = (
        <div>
            {/* Show the Modal only if its activated AND one of the available options is selected(filter, datepicker, attendees) */}
            <Modal
                show={modalActive && chosenOption}
                size="md"
                onClose={() => {
                    dispatch(resetModalOptions());
                    dispatch(closeModal());
                }}
            >
                {/* MODAL HEADER */}
                {modalOptions.filter === true &&
                    <Modal.Header>Select Filter:</Modal.Header>
                }

                {/* MODAL BODY */}
                <Modal.Body
                    className='flex justify-center p-0 m-0'
                >
                    {/* FILTERS, DATEPICKER OR ATTENDEES */}
                    {modalOptions.filter === true
                        ? <EventFilters totalItems={totalItems} />
                        : modalOptions.datepicker === true
                            ? <EventDatepicker />
                            : modalOptions.attendees === true && <EventDetailedAttendees fishingEvent={fishingEvent} />
                    }
                </Modal.Body>

                {/* MODAL FOOTER */}
                <Modal.Footer className='flex items-center justify-center'>
                    {/* CLOSE MODAL BUTTON */}
                    <Button
                        onClick={() => {
                            dispatch(resetModalOptions());
                            dispatch(closeModal());
                        }}
                        className='w-full'
                    >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    return content;
};

export default ModalOptions;