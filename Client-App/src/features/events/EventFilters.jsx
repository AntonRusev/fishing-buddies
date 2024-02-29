import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sidebar } from 'flowbite-react';

import { selectFilters, setFilter } from './eventsSlice';

const EventFilters = ({ totalItems }) => {
    const [activeFilter, setActiveFilter] = useState();

    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);

    useEffect(() => {
        // Get the currently active filter from global state(if any)
        Object.entries(filters.boolFilter).find(([key, value]) => {
            if (value === true) {
                setActiveFilter(key);
            };
        });
    }, [filters]);
    
    const content = (
        <Sidebar
            className='h-auto py-2 mx-auto'
            aria-label="Default sidebar example"
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {/* ALL EVENTS */}
                    <Sidebar.Item
                        onClick={(e) => dispatch(setFilter('all'))}
                        label={activeFilter === "all" && `${totalItems}`} // Events count
                        labelColor="dark"
                        active={activeFilter === "all"}
                        className='cursor-pointer'
                    >
                        All Events
                    </Sidebar.Item>

                    {/* ISGOING EVENTS */}
                    <Sidebar.Item
                        onClick={(e) => dispatch(setFilter('isgoing'))}
                        label={activeFilter === "isgoing" && `${totalItems}`} // Events count
                        labelColor="dark"
                        active={activeFilter === "isgoing"}
                        className='cursor-pointer'
                    >
                        I'm going
                    </Sidebar.Item>

                    {/* ISHOST EVENTS */}
                    <Sidebar.Item
                        onClick={(e) => dispatch(setFilter('ishost'))}
                        label={activeFilter === "ishost" && `${totalItems}`} // Events count
                        labelColor="dark"
                        active={activeFilter === "ishost"}
                        className='cursor-pointer'
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