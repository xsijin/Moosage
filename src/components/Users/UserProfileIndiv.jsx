import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import UserProfile from "./UserProfile";

function UserProfileIndiv() {
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/users/show/${userId}`
      );
      const result = await response.json();
      setSingleUser(result.user);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      {singleUser ? (
        <UserProfile user={singleUser} fetchUser={fetchUser} />
      ) : null}
    </>
  );
}

export default UserProfileIndiv;
