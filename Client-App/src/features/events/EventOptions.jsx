import { useDispatch } from 'react-redux';
import { Dropdown } from 'flowbite-react';

import { openModal, setModalOptions } from '../modals/modalsSlice';

import ModalOptions from '../modals/ModalOptions';

import { FaRegCalendarDays } from "react-icons/fa6";
import { BsFilterSquareFill } from "react-icons/bs";
import { BsArrowUpSquareFill } from "react-icons/bs";

const EventOptions = ({ totalItems }) => {
    const dispatch = useDispatch();

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
                            dispatch(setModalOptions('filter'));
                            dispatch(openModal());
                        }}
                        icon={BsFilterSquareFill}
                    >
                        Filter
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    {/* DATEPICKER */}
                    <Dropdown.Item
                        onClick={() => {
                            dispatch(setModalOptions('datepicker'));
                            dispatch(openModal());
                        }}
                        icon={FaRegCalendarDays}
                    >
                        Datepicker
                    </Dropdown.Item>
                    <Dropdown.Divider />

                    {/* SCROLL TO TOP */}
                    <Dropdown.Item
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        icon={BsArrowUpSquareFill}
                    >
                        Go Top
                    </Dropdown.Item>
                </Dropdown>
            </div>

            {/* MODAL */}
            {/* Small screen only (responsive design)*/}
            <ModalOptions totalItems={totalItems} />
        </>
    );

    return content;
};

export default EventOptions;