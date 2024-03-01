import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import UserProfile from "./UserProfile";

function UserProfileIndiv({ loggedUser, setNewPname }) {
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/users/show/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setSingleUser(result.user);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      {isLoading ? (
        <>
          <span className="loading loading-ring loading-lg"></span>
          <br />
          Loading profile...
        </>
      ) : (
        <>
          {singleUser ? (
            <UserProfile
              user={singleUser}
              fetchUser={fetchUser}
              loggedUser={loggedUser}
              setNewPname={setNewPname}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default UserProfileIndiv;
