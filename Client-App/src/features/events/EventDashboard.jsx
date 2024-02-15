import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";

import { useLazyGetAllEventsQuery } from './eventsApiSlice';
import { setPaginationParams, selectFilterParams } from './eventsSlice';

import EventsList from './EventsList';
import EventFilters from './EventFilters';
import EventOptions from './EventOptions';
import EventCardPlaceholder from './EventCardPlaceholder';
import BreadcrumbNav from '../../components/common/BreadcrumbNav';
import { Spinner } from 'flowbite-react';

const EventDashboard = () => {
    const [fishingEvents, setFishingEvents] = useState([]);
    const [paginationResult, setPaginationResult] = useState({});
    const [loadingNext, setLoadingNext] = useState(false);

    const dispatch = useDispatch();

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
            <section className='relative flex flex-col items-center'>
                <BreadcrumbNav />
                <div className='flex flex-col md:flex-row max-w-screen-lg justify-center'>
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
                    <div className='md:w-1/5 m-4 hidden lg:block'>
                        {/* FILTERS FOR TABLET AND DESKTOP */}
                        <EventFilters totalItems={paginationResult.totalItems} />
                    </div>
                    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 md:right-3/4 md:left-auto lg:hidden">
                        {/* OPTIONS FOR MOBILE ONLY */}
                        <EventOptions />
                    </div>
                </div>
            </section>
        );
    };

    return content;
};

export default EventDashboard;