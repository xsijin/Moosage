import React, { useState, useEffect } from "react";
import BoardList from "./BoardList";

const BoardsLanding = () => {
  const [userId, setUserId] = useState("65cfd9c270188fae2349b2b4"); // replace this with the actual user ID
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoard();
  }, [userId]);

  const fetchBoard = async () => {
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch board");
      }
      const data = await response.json();
      console.log(data);
      setBoards(data.boards);
    } catch (error) {
      console.error(error);
    }
  };

  const addBoard = async (newBoard) => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      // if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/create/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify(newBoard),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add moosage");
      }

      // Fetch the updated moosages again to reflect the changes immediately
      await fetchBoard();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <br />
      <div className="centered-content flex flex-col space-y-4">
        {!boards || !Array.isArray(boards) || boards.length === 0 ? (
          <p className="p-3">
            There are no boards currently, please add one of your own!
          </p>
        ) : (
          boards.map((board) => <BoardList key={board._id} board={board} />)
        )}
      </div>
    </>
  );
};

export default BoardsLanding;
