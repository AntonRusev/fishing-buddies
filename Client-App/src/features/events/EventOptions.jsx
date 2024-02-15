import { useState } from 'react';
import { Dropdown, Modal, Button } from 'flowbite-react';

import { FaRegCalendarDays } from "react-icons/fa6";
import { BsFilterSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";
import EventFilters from './EventFilters';
import EventDatepicker from './EventDatepicker';

const EventOptions = ({ totalItems }) => {
    const [openModal, setOpenModal] = useState(false);
    const [option, setOption] = useState('');

    const content = (
        <>
            <div>
                {/* OPTIONS */}
                <Dropdown
                    label="Options"
                    placement="top"
                    color="light"
                >
                    {/* FILTER */}
                    <Dropdown.Item
                        onClick={() => {
                            setOption('filter')
                            setOpenModal(true)
                        }}
                        icon={BsFilterSquareFill}
                    >
                        Filter
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    {/* DATEPICKER */}
                    <Dropdown.Item
                        onClick={() => {
                            setOption('datepicker')
                            setOpenModal(true)
                        }}
                        icon={FaRegCalendarDays}
                    >
                        Datepicker
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    {/* SCROLL TO TOP */}
                    <Dropdown.Item
                        icon={BsArrowUpSquareFill}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Go Top
                    </Dropdown.Item>
                </Dropdown>
            </div>

            {/* MODAL */}
            <Modal
                show={openModal && option}
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
                    className='flex items-center justify-center'
                >
                    {/* FILTERS OR DATEPICKER */}
                    {option === 'filter'
                        ? <EventFilters totalItems={totalItems} />
                        : <EventDatepicker />
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
        </>
    );

    return content;
};

export default EventOptions;