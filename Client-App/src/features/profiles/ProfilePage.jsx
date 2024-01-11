import { useGetProfileQuery } from "./profilesApiSlice";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams();

    const { data: profile } = useGetProfileQuery(username);

    let content;

    if (profile) {
        content = (
            <>
                <h3>Profile Page</h3>
                <h4>{profile.username}</h4>
                <p>Bio: {profile.bio}</p>
                <img src={profile.image} alt="" />
                <p>Photos : {profile.photos.length}</p>
            </>
        );
    } else {
        content = (
            <p>Could not find such user.</p>
        );
    };

    return content;
};

export default ProfilePage;