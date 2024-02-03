import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";

import { useLazyGetAllEventsQuery } from './eventsApiSlice';
import { selectPagination, setPage } from './eventsSlice';

import EventsList from './EventsList';
import EventCardPlaceholder from './EventCardPlaceholder';
import { Spinner } from 'flowbite-react';

const EventDashboard = () => {
    const [fishingEvents, setFishingEvents] = useState([]);
    const [paginationResult, setPaginationResult] = useState({});
    const [loadingNext, setLoadingNext] = useState(false);
    const [nextPage, setNextPage] = useState(1);

    const dispatch = useDispatch();

    const pagination = useSelector(selectPagination);

    const [trigger, { isLoading, isSuccess, data }] = useLazyGetAllEventsQuery();
    // const {
    //     data,
    //     isLoading,
    //     isSuccess,
    // } = useLazyGetAllEventsQuery({ pageNumber: pagination.currentPage, pageSize: 2, currentPage: pagination.currentPage });

    useEffect(() => {
        trigger({ pageNumber: pagination.currentPage, pageSize: 2, currentPage: pagination.currentPage });
    }, [pagination]);

    useEffect(() => {
        if (data) {
            const parsedResult = JSON.parse(data.paginationResult);

            setFishingEvents(data.apiResponse);
            setPaginationResult(parsedResult);
        };

        setLoadingNext(false);
    }, [data]);

    const handleGetNext = () => {
        setLoadingNext(true);
        // setNextPage(paginationResult.currentPage + 1);
        dispatch(setPage(paginationResult.currentPage + 1));
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
            <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && !!paginationResult && paginationResult.currentPage < paginationResult.totalPages && pagination.currentPage <= paginationResult.currentPage}
                initialLoad={false}
                loader={<Spinner key={0} />}
            >
                <EventsList fishingEvents={fishingEvents} />
            </InfiniteScroll>
        );
    };

    return content;
};

export default EventDashboard;