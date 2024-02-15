import { useState } from 'react';
import { Dropdown, Modal, Button } from 'flowbite-react';

import { FaRegCalendarDays } from "react-icons/fa6";
import { BsFilterSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";
import EventFilters from './EventFilters';

const EventOptions = () => {
    const [openModal, setOpenModal] = useState(false);
    const [option, setOption] = useState();

    const content = (
        <>
            <div>
                <Dropdown
                    label="Options"
                    placement="top"
                    color="light"
                >
                    <Dropdown.Item
                        onClick={() => setOpenModal(true)}
                        icon={BsFilterSquareFill}
                    >
                        Filter
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => setOpenModal(true)}
                        icon={FaRegCalendarDays}
                    >
                        Datepicker
                    </Dropdown.Item>
                    <Dropdown.Divider />

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
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <EventFilters />
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

    return content;
};

export default EventOptions;