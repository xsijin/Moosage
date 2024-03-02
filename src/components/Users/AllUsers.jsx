import React, { useEffect, useState, useCallback } from "react";
import UserProfile from "./UserProfile";

function AllUsers({ loggedUser, setNewPname }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        "https://moosage-backend.onrender.com/users/admin/show",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setUsers(result.users);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <br />
      <h1 className="text-2xl font-bold text-center petit-formal bg-base-100 p-3 rounded-3xl">
        All Moosengers
      </h1>

      {isLoading ? (
        <>
          <span className="loading loading-ring loading-lg"></span>
          <br />
          Loading profiles...
        </>
      ) : (
        <ul role="list">
          {users.map((user) => {
            return (
              <UserProfile
                user={user}
                key={user._id}
                fetchUsers={fetchUsers}
                loggedUser={loggedUser}
                setNewPname={setNewPname}
              />
            );
          })}
        </ul>
      )}
    </>
  );
}

export default AllUsers;
