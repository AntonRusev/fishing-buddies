import { NavLink } from "react-router-dom";

const EventDetailedHeader = ({ fishingEvent }) => {

    const content = (
        <div className="w-full">
            <div className="relative isolate flex flex-col justify-end overflow-hidden rounded px-8 pb-8 pt-40 mx-auto">
                {/* CANCELLED RIBBON */}
                {fishingEvent.isCancelled &&
                    <div className="absolute z-10 left-0 top-0 h-16 w-16">
                        <div
                            className="absolute transform -rotate-45 bg-orange-600 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                            Cancelled
                        </div>
                    </div>
                }

                {/* BACKGROUND PICTURE */}
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={`/${fishingEvent.category}.jpg`}
                    alt="bg-picture"
                />

                {/* FADE */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

                {/* TITLE */}
                <h3 className="z-10 mt-3 text-3xl font-bold text-white font-serif tracking-wider">
                    {fishingEvent.title}
                </h3>

                {/* HOST */}
                <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    Hosted by
                    <span className="font-bold">
                        {/* PROFILE LINK */}
                        <NavLink
                            to={`/profile/${fishingEvent.hostUsername}`}
                            data-testid="event-details-hostlink"
                        >
                            {fishingEvent.hostUsername}
                        </NavLink>
                    </span>
                </div>
            </div>
        </div>
    );

    return content;
};

export default EventDetailedHeader;