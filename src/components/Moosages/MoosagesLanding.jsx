import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MoosageDisplay from "./MoosagesDisplay";
import MoosageInput from "./MoosagesInput";
import LandingError from "./LandingError";
import "./Moosages.css";

const MoosagesLanding = ({ setResetToken, userBoard, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const [moosages, setMoosages] = useState([]);
  const [selectedMoosageId, setSelectedMoosageId] = useState(null);
  const [deleteMoosageId, setDeleteMoosageId] = useState(null);
  const { boardId: routeBoardId } = useParams();
  const userBoardId = userBoard && userBoard._id;
  const [boardTitle, setBoardTitle] = useState(userBoard && userBoard.title);
  const boardId = routeBoardId ? routeBoardId : userBoardId;

  const fetchMoosages = async () => {
    if (isFirstLoad) setIsLoading(true);
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/show/${boardId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch moosages");
      }
      const data = await response.json();
      setMoosages(data);
      setFetchSuccess(true);
    } catch (error) {
      console.error(error);
      setFetchSuccess(false);
    } finally {
      setIsLoading(false);
      if (isFirstLoad) setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    const fetchBoardDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://moosage-backend.onrender.com/boards/show/${boardId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch board details");
        }
        const data = await response.json();
        console.log("Landed via paramId", data);
        setBoardTitle(data.board.title);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userBoard && routeBoardId) {
      fetchBoardDetails();
    }

    if (boardId) {
      fetchMoosages();
    }

    if (userBoard) {
      setBoardTitle(userBoard.title);
    }
  }, [routeBoardId, userBoardId]);

  useEffect(() => {
    if (userBoard) {
      console.log("Landed via userBoard", userBoard);
      setBoardTitle(userBoard.title);
      fetchMoosages();
    }
  }, [userBoard]);

  const addMoosage = async (newMoosage) => {
    setAddLoading(true);
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
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <br />
      {!boardId ? (
        <div className="petit-formal text-2xl bg-base-100 p-5 rounded-[40px]">
          <p>Please choose a board you'd like to view.</p>
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
        </div>
      ) : isLoading ? (
        <p className="text-center px-10">
          <span className="loading loading-ring loading-lg"></span>
          <br />
          Loading board...
        </p>
      ) : fetchSuccess && moosages ? (
        <>
          <div className="centered-content flex flex-col space-y-4 bg-base-100 p-3">
            <span className="text-2xl font-bold text-center petit-formal">
              Moosages for {boardTitle}
            </span>
          </div>
          <br />
          <div className="centered-content flex flex-col space-y-4 bg-base-100/70 p-3">
            <MoosageInput addMoosage={addMoosage} user={user} />
            <div className="divider divider-accent">
              {addLoading ? (
                <span className="loading loading-ring loading-lg text-accent"></span>
              ) : (
                <></>
              )}
            </div>
            {!Array.isArray(moosages) || moosages.length === 0 ? (
              <p className="p-3">
                Congratulations!
                <br />
                You've got the honour of being the first poster should you
                choose to do so.
                <br />
                <br />
                No pressure. 😎
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
                  user={user}
                />
              ))
            )}
          </div>
        </>
      ) : (
        // failed to fetch moosages
        <>
          <LandingError />
        </>
      )}
    </>
  );
};

export default MoosagesLanding;
