import EventFilters from '../EventFilters';
import EventDatepicker from '../EventDatepicker';

import { Modal, Button } from 'flowbite-react';
import EventDetailedAttendees from './EventDetailedAttendees';

const EventDetailedModal = ({ option, openModal, setOption, setOpenModal, totalItems, fishingEvent }) => {
    const content = (
        <div>
            <Modal
                className='m-auto'
                show={openModal && option}
                size="md"
                onClose={() => {
                    setOption('')
                    setOpenModal(false)
                }}
            >
                {/* MODAL HEADER */}
                {option === "filter" &&
                    <Modal.Header>Select Filter:</Modal.Header>
                }

                {/* MODAL BODY */}
                <Modal.Body
                    className='flex justify-center'
                >
                    {/* FILTERS OR DATEPICKER */}
                    {option === 'filter'
                        ? <EventFilters totalItems={totalItems} />
                        : option === 'datepicker'
                            ? <EventDatepicker />
                            : <EventDetailedAttendees fishingEvent={fishingEvent} />
                    }
                </Modal.Body>

                {/* MODAL FOOTER */}
                <Modal.Footer
                    className='flex items-center justify-center'
                >
                    {/* CLOSE MODAL BUTTON */}
                    <Button
                        onClick={() => setOpenModal(false)}
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

export default EventDetailedModal;