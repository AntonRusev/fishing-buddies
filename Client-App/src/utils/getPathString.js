const getPathString = (path) => {
    if (path.length) {
        // Get the index of the last "/" in the path string, if there is one
        let lastIndex = path.lastIndexOf('/');

        // Get the string between the first and the last "/"
        if (lastIndex === 0) {
            return path.slice(1);
        } else {
            return path.slice(1, lastIndex);
        };
    };
};

export default getPathString;