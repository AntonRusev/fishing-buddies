import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from 'flowbite-react';

import { useLazyGetAllEventsQuery } from './eventsApiSlice';
import { setPaginationParams, selectFilterParams } from './eventsSlice';
import { selectCurrentUsername } from '../auth/authSlice';

import EventsList from './EventsList';
import EventFilters from './EventFilters';
import EventOptions from './EventOptions';
import EventCardPlaceholder from './EventCardPlaceholder';
import EventDatepicker from './EventDatepicker';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';

const EventDashboard = () => {
    const [fishingEvents, setFishingEvents] = useState([]);
    const [paginationResult, setPaginationResult] = useState({});
    const [loadingNext, setLoadingNext] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUsername);
    const filterParams = useSelector(selectFilterParams);
    const [trigger, { isLoading, isSuccess, data }] = useLazyGetAllEventsQuery();

    useEffect(() => {
        // Send a request with the current filter params
        if (filterParams) {
            trigger({ ...filterParams });
        };
    }, [filterParams]);

    useEffect(() => {
        // Populate state with response data
        if (data) {
            const parsedResult = JSON.parse(data.paginationResult);

            setFishingEvents(data.apiResponse);
            setPaginationResult(parsedResult);
        };

        setLoadingNext(false);
    }, [data]);

    const handleGetNext = () => {
        // GET NEXT PAGE
        // (Get the next batch of paginated data)
        setLoadingNext(true);
        dispatch(setPaginationParams({ pageNumber: paginationResult.currentPage + 1 }));
    };

    let shownList;

    if (isLoading) {
        // LOADING PLACEHOLDERS
        shownList = (
            <div className='flex flex-col gap-6 w-full'>
                <EventCardPlaceholder />
                <EventCardPlaceholder />
                <EventCardPlaceholder />
            </div>
        );
    } else if (isSuccess && fishingEvents.length > 0) {
        // SHOW ACTUAL EVENTS LIST
        shownList = (
            <div className='md:w-4/5'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!paginationResult && paginationResult.currentPage < paginationResult.totalPages}
                    initialLoad={false}
                    loader={<Spinner key={0} />}
                >
                    {/* EVENTS LIST */}
                    <EventsList fishingEvents={fishingEvents} />
                </InfiniteScroll>
            </div>
        );
    } else if (isSuccess && fishingEvents.length === 0) {
        // SHOW "No events" TEXT
        shownList = (
            <h3 className='m-auto text-gray-500 text-6xl italic font-serif dark:text-gray-200'>
                No events.
            </h3>);
    };

    const content = (
        <div 
        className='relative flex flex-col items-center dark:bg-gray-900'
        data-testid="events-dashboard"
        >
            {/* Showing selected filter and start date */}
            <BreadcrumbNav />
            <div className='flex flex-col mt-12 md:flex-row max-w-screen-lg justify-center w-full'>
                {/* EVENTS LIST (or Event skeleton placeholders) */}
                {shownList}

                <div className='flex flex-col md:w-1/5 m-2 hidden xl:block'>
                    {/* FILTERS AND DATEPICKER FOR TABLET AND DESKTOP */}
                    <EventDatepicker />
                    {/* Show filters only to authenticated users */}
                    {user && <EventFilters totalItems={paginationResult.totalItems} />}
                </div>

                <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 md:right-3/4 md:left-auto xl:hidden">
                    {/* OPTIONS FOR MOBILE ONLY */}
                    <EventOptions user={user} totalItems={paginationResult.totalItems} />
                </div>
            </div>
        </div>
    );

    return content;
};

export default EventDashboard;