import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";

import { useLazyGetAllEventsQuery } from './eventsApiSlice';
import { setPaginationParams, selectFilterParams } from './eventsSlice';

import EventsList from './EventsList';
import EventFilters from './EventFilters';
import EventCardPlaceholder from './EventCardPlaceholder';
import { Spinner } from 'flowbite-react';

const EventDashboard = () => {
    const [fishingEvents, setFishingEvents] = useState([]);
    const [paginationResult, setPaginationResult] = useState({});
    const [loadingNext, setLoadingNext] = useState(false);

    const dispatch = useDispatch();

    const filterParams = useSelector(selectFilterParams);

    const [trigger, { isLoading, isSuccess, data }] = useLazyGetAllEventsQuery();

    useEffect(() => {
        if (filterParams) {
            // Send a request with the current filter params
            trigger({ ...filterParams});
        };
    }, [filterParams]);

    useEffect(() => {
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

    let content;

    if (isLoading) {
        // TODO - Design the Skeleton(Placeholder) to resemble the actual Card Component
        content = (
            <div className='flex flex-col gap-4'>
                <EventCardPlaceholder />
                <EventCardPlaceholder />
                <EventCardPlaceholder />
            </div>
        );
    } else if (isSuccess) {
        content = (
            <div className='flex'>
                <div className='flex-shrink-0'>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!paginationResult && paginationResult.currentPage < paginationResult.totalPages}
                        initialLoad={false}
                        loader={<Spinner key={0} />}
                    >
                        <EventsList fishingEvents={fishingEvents} />
                    </InfiniteScroll>
                </div>
                <div className='flex-shrink-0'>
                    <EventFilters />
                    {/* Place for Calendar Filter Component */}
                </div>
            </div>
        );
    };

    return content;
};

export default EventDashboard;