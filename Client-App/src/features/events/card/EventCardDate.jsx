import { format } from "date-fns";

const EventCardDate = ({ fishingEvent }) => {
    // Getting the Day and Month from the Event object;
    const [day, month] = format(fishingEvent.date, 'dd MMM yyyy').split(' ');

    return (
        <div className="position: relative">
            <div className="text-base font-normal uppercase pb-3 absolute top-2.5 right-0 px-0.5 pb-0.5 w-20 text-center border-2 border-gray-700 dark:border-white mr-4 font-serif text-gray-700 dark:text-white">
                <h3 className="text-center pt-1 pt-2 text-xl tracking-wider leading-tight text-lg text-600 font-bold">
                    {month}
                </h3>
                <h3 className="text-2xl text-center tracking-wider leading-tight text-xl text-600 font-bold">
                    {day}
                </h3>
            </div>
        </div>
    );
};

export default EventCardDate;