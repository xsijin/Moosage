import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MoosageDisplay from "./MoosagesDisplay";
import MoosageInput from "./MoosagesInput";
import "./Moosages.css";

const MoosagesLanding = ({ setResetToken, userBoard, deleteMoosageToken }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    }
    setIsLoading(false);
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
      }
      setIsLoading(false);
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

    if (isFirstLoad) setIsFirstLoad(false);
  }, [routeBoardId, userBoardId, deleteMoosageToken]);

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
      ) : isLoading ? (
        <p>
          <span className="loading loading-ring loading-lg"></span>
        </p>
      ) : fetchSuccess ? (
        <div className="centered-content flex flex-col space-y-4">
          <span className="text-2xl font-bold text-center petit-formal">
            Moosages for {boardTitle}
          </span>
          <MoosageInput addMoosage={addMoosage} />
          {!moosages || !Array.isArray(moosages) || moosages.length === 0 ? (
            <p className="p-3">
              Congratulations!
              <br />
              You've got the honour of being the first poster should you choose
              to do so.
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
              />
            ))
          )}
        </div>
      ) : (
        <>
          <p>
            You've landed on the wrong side of the <b>moo</b>n.
            <br />
            🌚
          </p>
          <br />
          <Link to="/">Go 🔙 home?</Link>
          <br />
          <br />
          Or you can stay here and admire the scenery.
          <br />
          <br />
          Up to you!
          <br />
          <br />
          <div className="carousel w-[612px] h-[408px]">
            <div id="item1" className="carousel-item w-full">
              <img
                src="https://media.istockphoto.com/id/477832804/photo/sleeping-cows-at-sunrise.jpg?s=612x612&w=0&k=20&c=mtPZXS5trDLST4E-IAwhwFqf-JPBodJVOQhEP72tD8s="
                className="w-full"
              />
            </div>
            <div id="item2" className="carousel-item w-full">
              <img
                src="https://www.shutterstock.com/image-photo/cows-herd-on-grass-field-600nw-2030724431.jpg"
                className="w-full"
              />
            </div>
            <div id="item3" className="carousel-item w-full">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293c3xlbnwwfHwwfHx8MA%3D%3D"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">
              1
            </a>
            <a href="#item2" className="btn btn-xs">
              2
            </a>
            <a href="#item3" className="btn btn-xs">
              3
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default MoosagesLanding;
