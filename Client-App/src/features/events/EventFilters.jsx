import { useDispatch } from 'react-redux';

import { setFilter } from './eventsSlice';

import { Sidebar } from 'flowbite-react';

const EventFilters = () => {
    const dispatch = useDispatch();

    const content = (
        <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        onClick={() => dispatch(setFilter('all'))}
                        label="Pro"
                        labelColor="dark"
                    >
                        All Events
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick={() => dispatch(setFilter('isgoing'))}
                        label="3"
                    >
                        I'm going
                    </Sidebar.Item>
                    <Sidebar.Item
                        onClick={() => dispatch(setFilter('ishost'))}
                    >
                        I'm hosting
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );

    return content;
};

export default EventFilters;