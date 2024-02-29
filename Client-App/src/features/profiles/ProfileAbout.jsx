import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'flowbite-react';

import { selectCurrentUser } from '../auth/authSlice';

import FollowButton from './FollowButton';
import ProfileEdit from './ProfileEdit';

const ProfileAbout = ({ profile }) => {
    const [editMode, setEditMode] = useState(false);

    const user = useSelector(selectCurrentUser);

    let content;

    if (profile && !editMode) {
        content = (
            <article className="flex w-full xl:max-w-screen-xl mx-2 bg-gray-50 rounded sm:w-3/4 dark:bg-gray-900">
                <div className="flex flex-col w-full content-between px-4 py-4 rounded sm:flex-row lg:gap-8 xl:gap-0 dark:bg-gray-800">
                    <div className="flex flex-col w-full ml-4 place-self-center">
                        {/* TITLE*/}
                        <h4 className="mr-auto font-bold text-lg text-gray-900 font-serif tracking-wide dark:text-white">
                            About {profile.username}
                        </h4>

                        {/* BIO */}
                        <div className='flex justify-center py-6 font-light whitespace-pre-wrap text-gray-500 md:text-lg lg:text-xl dark:text-gray-400'>
                            {profile.bio}
                        </div>
                    </div>
                    <div className='flex flex-col-reverse w-auto pt-1 sm:flex-col'>
                        {/* FOLLOW BUTTON */}
                        <FollowButton profile={profile} />

                        {/* EDIT BUTTON */}
                        {/* Only if the User is the owner of the Profile */}
                        {profile.username === user &&
                            <Button
                                onClick={() => setEditMode(true)}
                            >
                                Edit
                            </Button>
                        }

                        <div className="flex text-base justify-center font-normal uppercase p-0.5 w-auto text-center text-gray-700 sm:justify-normal dark:text-white">
                            {/* FOLLOWERS */}
                            <div className="flex flex-col m-2">
                                {profile.followersCount}
                                <span>Followers</span>
                            </div>
                            
                            {/* FOLLOWING */}
                            <div className="flex flex-col m-2">
                                {profile.followingCount}
                                <span>Following</span>
                            </div>
                        </div>
                    </div>

                </div>
            </article>
        );
    } else if (editMode) {
        content = (<ProfileEdit setEditMode={setEditMode} />);
    };

    return content;
};

export default ProfileAbout;