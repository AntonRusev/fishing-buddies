import { Tabs } from 'flowbite-react';
import { HiClipboardList, HiUserCircle, HiCamera, HiUserGroup, HiUsers } from 'react-icons/hi';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';

const ProfileNavBar = ({ profile }) => {

    const content = (
        <div className="overflow-x-auto">
            <Tabs aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item active title="About" icon={HiUserCircle}>
                    {/* This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling. */}
                    <ProfileAbout profile={profile} />
                </Tabs.Item>
                <Tabs.Item title="Photos" icon={HiCamera}>
                    {/* This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling. */}
                    <ProfilePhotos profile={profile} />
                </Tabs.Item>
                <Tabs.Item disabled title="Events" icon={HiClipboardList}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item disabled title="Followers" icon={HiUserGroup}>
                    This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                    Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                </Tabs.Item>
                <Tabs.Item disabled title="Following" icon={HiUsers}>
                    Disabled content
                </Tabs.Item>
            </Tabs>
        </div>
    );

    return content;
};

export default ProfileNavBar;