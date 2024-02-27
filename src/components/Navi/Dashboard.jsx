import React, { useState } from "react";
import MoosagesLanding from "../Moosages/MoosagesLanding";
import BoardsLanding from "../Boards/BoardsLanding";

const Dashboard = ({ user }) => {
  const [resetToken, setResetToken] = useState(0);
  const [deleteMoosageToken, setDeleteMoosageToken] = useState(0);
  const [userBoard, setUserBoard] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-around">
      <div className="">
        <BoardsLanding
          user={user}
          resetToken={resetToken}
          setUserBoard={setUserBoard}
          setDeleteMoosageToken={setDeleteMoosageToken}
        />
      </div>
      <div className="">
        <MoosagesLanding
          user={user}
          setResetToken={setResetToken}
          userBoard={userBoard}
          deleteMoosageToken={deleteMoosageToken}
        />
      </div>

      <button
        onClick={scrollToTop}
        className="text-primary-content hover:text-primary fixed bottom-5 right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Dashboard;
