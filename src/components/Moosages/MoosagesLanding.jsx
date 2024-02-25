import React, { useState, useEffect } from "react";
import MoosageDisplay from "./MoosagesDisplay";
import MoosageInput from "./MoosagesInput";
import "./Moosages.css";

const MoosagesLanding = ({ setResetToken, userBoard }) => {
  const [moosages, setMoosages] = useState([]);
  const [selectedMoosageId, setSelectedMoosageId] = useState(null);
  const [deleteMoosageId, setDeleteMoosageId] = useState(null);
  const boardId = userBoard && userBoard._id;
  const boardTitle = userBoard && userBoard.title;

  useEffect(() => {
    if (boardId) {
      fetchMoosages();
    }
  }, [boardId]);

  const fetchMoosages = async () => {
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/show/${boardId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch moosages");
      }
      const data = await response.json();
      setMoosages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addMoosage = async (newMoosage) => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      // if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/create/${boardId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify(newMoosage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add moosage");
      }

      // Fetch the updated moosages again to reflect the changes immediately
      await fetchMoosages();
      setResetToken((prevToken) => prevToken + 1); // trigger re-render of boards to show +1 moosage count
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <br />
      {!boardId ? (
        <>
          <p className="petit-formal text-2xl">
            Please choose a board you'd like to view.
          </p>
          <p>
            <svg
              fill="currentColor"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="70px"
              height="130px"
              viewBox="0 0 60.731 60.73"
              xmlSpace="preserve"
            >
              <path d="M17.778,44.857v11.026L0,38.105l17.778-17.781v11.163c20.952-1.58,37.88-12.49,41.993-26.64 c0.627,2.158,0.96,4.393,0.96,6.682C60.731,28.812,41.931,43.037,17.778,44.857z"></path>
            </svg>
          </p>
        </>
      ) : (
        <div className="centered-content flex flex-col space-y-4">
          <span className="petit-formal text-2xl">
            Moosages for {boardTitle}
          </span>
          <MoosageInput addMoosage={addMoosage} />
          {!moosages || !Array.isArray(moosages) || moosages.length === 0 ? (
            <p className="p-3">
              Congratulations, you've got the honour of being the first poster.
            </p>
          ) : (
            moosages.map((moosage) => (
              <MoosageDisplay
                key={moosage._id}
                moosage={moosage}
                boardId={boardId}
                moosages={moosages}
                moosageId={moosage._id}
                setMoosages={setMoosages}
                selectedMoosageId={selectedMoosageId}
                setSelectedMoosageId={setSelectedMoosageId}
                deleteMoosageId={deleteMoosageId}
                setDeleteMoosageId={setDeleteMoosageId}
                setResetToken={setResetToken}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default MoosagesLanding;
