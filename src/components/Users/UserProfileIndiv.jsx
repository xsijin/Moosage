import { useState, useEffect } from "react";
import { useParams } from "react-router"
import UserProfile from "./UserProfile";

function UserProfileIndiv() {

    const params = useParams();

    const [userId, setUserId] = useState(params.userId);
    const [user, setuser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(   
              `https://moosage-backend.onrender.com/users/show/${userId}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch user details");
            }
            const data = await response.json();
            setuser(data.user);

          } catch (error) {
            console.error(error);
          }
        };

        fetchUser();

    }, [userId]);


    return (
        <>
            { user
                ? <UserProfile user={user} />
                : null
            }
        </>
    )
}

export default UserProfileIndiv;