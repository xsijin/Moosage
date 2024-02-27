import React, { useState, useEffect } from "react";
import BoardList from "./BoardList";

const BoardsLanding = ({ resetToken, setUserBoard, setDeleteMoosageToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [userId, setUserId] = useState("65cfd9c270188fae2349b2b4"); // replace this with the actual user ID
  const [boards, setBoards] = useState([]);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState(null);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [cancelToken, setCancelToken] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [newBoard, setNewBoard] = useState({
    // userId: moosage.userId,
    title: "",
    description: "",
    is_public: true,
  });

  useEffect(() => {
    fetchBoard();
  }, [userId, resetToken]);

  const fetchBoard = async () => {
    if (isFirstLoad) setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/boards/user/${userId}`
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
    setIsLoading(false);
    if (isFirstLoad) setIsFirstLoad(false);
  };

  const handleAddInputChange = (e) => {
    setNewBoard({
      ...newBoard,
      [e.target.name]: e.target.value,
    });
  };

  const handleBoardCancelClick = () => {
    setShowForm(false);
    setNewBoard({
      // userId: moosage.userId,
      title: "",
      description: "",
      is_public: true,
    });
  };

  const handleBoardSaveClick = async () => {
    let boardToSave = { ...newBoard };
    if (newBoard.title.trim() === "") {
      delete boardToSave.title;
    }
    await addBoard(boardToSave);
    setShowForm(false);
    setNewBoard({
      // userId: moosage.userId,
      title: "",
      description: "",
      is_public: true,
    });
  };

  const addBoard = async (newBoard) => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      // if (!token) throw new Error("Token not found");

      const response = await fetch(
        `http://localhost:3000/boards/create/${userId}`,
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
        throw new Error("Failed to add board");
      }

      // Fetch the updated board again to reflect the changes immediately
      await fetchBoard();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsDeleteClicked(false); // Reset isDeleteClicked when edit is clicked
    setIsEditClicked(true);
  };

  const handleDeleteClick = () => {
    setIsEditClicked(false); // Reset isEditClicked when delete is clicked
    setIsDeleteClicked(true);
  };

  const handleExit = () => {
    setIsDeleteClicked(false);
    setIsEditClicked(false);
    setShowForm(false);
    setShowShare(false);
    setCancelToken((prevToken) => prevToken + 1); // to trigger useEffect in BoardList that sets all isEdit state to false
  };

  return (
    <>
      <br />
      <div className="centered-content flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-center petit-formal">
          My Boards
        </h1>

        {isLoading ? (
          <div>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <>
            {!boards || !Array.isArray(boards) || boards.length === 0 ? (
              <p className="p-3">
                Much space for your board here.
                <br />
                Click on the Board Assistant below to add one!
              </p>
            ) : (
              boards.map((board) => (
                <BoardList
                  key={board._id}
                  board={board}
                  isDeleteClicked={isDeleteClicked}
                  isEditClicked={isEditClicked}
                  setBoards={setBoards}
                  boardId={board._id}
                  boards={boards}
                  deleteBoardId={deleteBoardId}
                  setDeleteBoardId={setDeleteBoardId}
                  userId={userId}
                  selectedBoardId={selectedBoardId}
                  setSelectedBoardId={setSelectedBoardId}
                  cancelToken={cancelToken}
                  setUserBoard={setUserBoard}
                  showShare={showShare}
                  setDeleteMoosageToken={setDeleteMoosageToken}
                />
              ))
            )}
          </>
        )}

        <div>
          {showForm && (
            <>
              <div className="form-control">
                <input
                  type="text"
                  name="title"
                  placeholder="Name your new board"
                  value={newBoard.title}
                  onChange={handleAddInputChange}
                  className="input input-bordered min-w-[400px] max-w-[400px] mb-2"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="What's this board about?"
                  value={newBoard.description}
                  onChange={handleAddInputChange}
                  className="input input-bordered min-w-[400px] max-w-[400px]"
                />
              </div>

              <div className="form-control items-end">
                <label className="cursor-pointer label">
                  <div
                    className="tooltip"
                    data-tip="Unchecking this box will only allow admin and board owners (you!) to view."
                  >
                    <span className="label-text">Public</span>
                  </div>
                  &nbsp;
                  <input
                    type="checkbox"
                    name="is_public"
                    checked={newBoard.is_public}
                    onChange={(e) =>
                      handleAddInputChange({
                        target: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
                    className="checkbox checkbox-warning"
                  />
                </label>
              </div>

              <div className="flex space-x-2 justify-center">
                <button onClick={handleBoardSaveClick} className="btn btn-xs">
                  Save Changes
                </button>

                <button onClick={handleBoardCancelClick} className="btn btn-xs">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        <div className="dropdown dropdown-right">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-submit btn-circle bg-neutral-content text-neutral"
          >
            <img src="boardemoji.png" width="50" height="50" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li
              onClick={() => {
                setShowShare(true);
              }}
            >
              <a>Copy board URL</a>
            </li>
            <li
              onClick={() => {
                setShowForm(true);
              }}
            >
              <a>Create new board</a>
            </li>
            <li
              onClick={() => {
                handleEditClick();
              }}
            >
              <a>Edit a board</a>
            </li>
            <li
              onClick={() => {
                handleDeleteClick();
              }}
            >
              <a>Delete a board</a>
            </li>
            <li
              onClick={() => {
                handleExit();
              }}
            >
              <a>Exit edit mode</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BoardsLanding;
