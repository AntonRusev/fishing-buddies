const ProfileAbout = ({ profile }) => {
    let content;

    if (profile) {
        content = (
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            {profile.username}'s Profile
                        </h2>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            {profile.bio}
                        </p>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={profile.image} alt="mockup" />
                    </div>
                </div>
            </section>
            // <section className='container flex flex-col flex-wrap justify-between items-center mx-auto'>
            //     <h3>Profile Page</h3>
            //     <h4>{profile.username}</h4>
            //     <p>Bio: {profile.bio}</p>
            //     <img src={profile.image} alt="" />
            //     <p>Photos : {profile.photos.length}</p>
            // </section>
        );
    };

    return content;
};

export default ProfileAbout;