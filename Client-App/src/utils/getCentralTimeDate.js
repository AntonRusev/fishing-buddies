const getCentralTimeDate = (date) => {
    let parsedDate;

    // Parsing the date to string
    if (date instanceof Date) {
        parsedDate = date.toISOString();
    } else {
        parsedDate = date;
    };

    let dateInCentralTime;

    // Checking if the date is in UTC
    if (parsedDate.charAt(parsedDate.length - 1) === "Z") {
        dateInCentralTime = parsedDate;
    } else {
        // If not, parsing the date to UTC time
        dateInCentralTime = new Date(date + 'Z').toISOString();
    };

    return dateInCentralTime;
};

export default getCentralTimeDate;