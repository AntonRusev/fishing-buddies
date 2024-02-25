const getProfilePredicate = (pathname) => {
    // Getting the Profile predicate from the url path
    let predicate = pathname.split('/').pop();

    // If it's not one of the following, setting it to the default "about"
    if (predicate !== "photos"
        && predicate !== "events"
        && predicate !== "followers"
        && predicate !== "following"
    ) {
        predicate = "about";
    };
    
    return predicate;
};

export default getProfilePredicate;