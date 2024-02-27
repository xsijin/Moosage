import React, { useEffect, useState, useCallback } from "react";
import UserProfile from "./UserProfile";

function AllUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://moosage-backend.onrender.com/users/admin/show"
      );
      const result = await response.json();
      setUsers(result.users);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
}, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <br />
      <h1 className="text-2xl font-bold text-center petit-formal">
        All Moosagers
      </h1>

      {users.length === 0 ? (
        <p>
          <span className="loading loading-ring loading-lg"></span>
        </p>
      ) : (
        <ul role="list">
          {users.map((user) => {
            return <UserProfile user={user} key={user._id} fetchUsers={fetchUsers} />;
          })}
        </ul>
      )}
    </>
  );
}

export default AllUsers;
