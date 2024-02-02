import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroller";

import { useGetAllEventsQuery } from './eventsApiSlice';

import EventsList from './EventsList';
import EventCardPlaceholder from './EventCardPlaceholder';
import { Spinner } from 'flowbite-react';

const EventDashboard = () => {
    const [fishingEvents, setFishingEvents] = useState([]);
    const [paginationResult, setPaginationResult] = useState({});
    const [loadingNext, setLoadingNext] = useState(false);
    const [nextPage, setNextPage] = useState(1);

    const {
        data,
        isLoading,
        isSuccess,
    } = useGetAllEventsQuery({ pageNumber: nextPage, pageSize: 4 });

    useEffect(() => {
        if (data) {
            setFishingEvents(data.apiResponse);
            setPaginationResult(JSON.parse(data.paginationResult));
        };
        setLoadingNext(false);
    }, [data]);

    const handleGetNext = () => {
        setLoadingNext(true);
        setNextPage(paginationResult.currentPage + 1);
        // setPagingParams(new PagingParams(paginationResult.currentPage + 1))
        // loadActivities().then(() => setLoadingNext(false))
    };

    console.log(loadingNext)

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
                hasMore={!loadingNext && !!paginationResult && paginationResult.currentPage < paginationResult.totalPages}
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