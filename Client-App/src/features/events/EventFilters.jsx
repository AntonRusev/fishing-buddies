import { useDispatch } from 'react-redux';

import { setFilter, setStartDate } from './eventsSlice';

import { Sidebar, Datepicker } from 'flowbite-react';

const EventFilters = ({ totalItems }) => {
    const dispatch = useDispatch();

    const content = (
        <section>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            onClick={() => dispatch(setFilter('all'))}
                            label={totalItems}
                            labelColor="dark"
                        >
                            All Events
                        </Sidebar.Item>
                        <Sidebar.Item
                            onClick={() => dispatch(setFilter('isgoing'))}
                            label={totalItems}
                        >
                            I'm going
                        </Sidebar.Item>
                        <Sidebar.Item
                            onClick={() => dispatch(setFilter('ishost'))}
                            label={totalItems}
                        >
                            I'm hosting
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            {/* DATEPICKER / CALENDAR */}
            <Datepicker inline
                title="Filter by Starting Date"
                weekStart={1} // Monday
                onSelectedDateChanged={(value) => dispatch(setStartDate(value.toISOString()))} // Custom onChangeHandler coming from Flowbite-React
            />
        </section>
    );

    return content;
};

export default EventFilters;