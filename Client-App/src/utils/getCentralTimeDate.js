const getCentralTimeDate = (date) => {
    // Parsing the date to UTC time
    const dateInCentralTime = new Date(date + 'Z').toISOString();
    
    return dateInCentralTime;
};

export default getCentralTimeDate;