const capitalizeFirstLetter = (str) => {
        return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export default capitalizeFirstLetter;