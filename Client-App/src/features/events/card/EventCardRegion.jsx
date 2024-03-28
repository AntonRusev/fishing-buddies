import { HiLocationMarker } from "react-icons/hi";

const EventCardRegion = ({ fishingEvent }) => {
    return (
        <div className="block mt-1 mr-6 text-lg md:w-3/4 lg:w-3/4 leading-tight font-semibold text-gray-200 hover:underline text-gray-700 dark:text-white">
            <small className="mb-1 text-400 align-super">
                <HiLocationMarker className="inline-block align-top" />
                {fishingEvent.region}
            </small>
        </div>
    );
};

export default EventCardRegion;