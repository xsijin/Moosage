import React, { useState, useEffect } from "react";

const BoardList = ({
  board,
  isDeleteClicked,
  isEditClicked,
  isCopyClicked,
  setBoards,
  boardId,
  boards,
  deleteBoardId,
  setDeleteBoardId,
  userId,
  selectedBoardId,
  setSelectedBoardId,
  cancelToken,
  setUserBoard,
  userBoard,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editedBoard, setEditedBoard] = useState({
    // _id: board._id,
    title: board.title,
    description: board.description,
    is_public: board.is_public,
  });

  const handleBoardCopyClick = () => {
    navigator.clipboard.writeText(
      `https://moosages.onrender.com/board/${board._id}`
    );
    setShowToast(true);
  };

  const handleBoardEditClick = () => {
    setSelectedBoardId(board._id);
    setEditedBoard({
      // userId: moosage.userId,
      title: board.title,
      description: board.description,
      is_public: board.is_public,
    });
    setIsEditingBoard(true);
  };

  const handleBoardCancelClick = () => {
    setIsEditingBoard(false);
    setEditedBoard({
      // userId: moosage.userId,
      title: board.title,
      description: board.description,
      is_public: board.is_public,
    });
  };

  const handleBoardInputChange = (e) => {
    setEditedBoard({
      ...editedBoard,
      [e.target.name]: e.target.value,
    });
  };

  const handleBoardSaveClick = async () => {
    // Check if the title is empty
    if (editedBoard.title.trim() === "") {
      console.error(
        "Board title cannot be empty or all spaces, please enter a title to proceed."
      );
      return;
    }

    await handleBoardPatchSubmit();
    setIsEditingBoard(false);
  };

  const handleBoardPatchSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/update/${board._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedBoard.title,
            description: editedBoard.description,
            is_public: editedBoard.is_public,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update board");
      }

      // Add the board._id to the editedBoard object
      const updatedEditedBoard = {
        ...editedBoard,
        _id: board._id,
      };

      // Update the state directly
      setBoards(
        boards.map((updatedBoard) =>
          updatedBoard._id === board._id
            ? {
                ...updatedBoard,
                title: updatedEditedBoard.title,
                description: updatedEditedBoard.description,
                is_public: updatedEditedBoard.is_public,
              }
            : updatedBoard
        )
      );
      if (board._id === userBoard._id) {
        linkToMoosages(updatedEditedBoard);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsEditingBoard(false);
  }, [cancelToken]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Delete feature - opens modal
  const handleDeleteClick = async (id) => {
    setDeleteBoardId(id);
    document.getElementById("deleteConfirmationModalBoard").showModal();
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/remove/${deleteBoardId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete board");
      }

      const updatedBoards = boards.filter(
        (board) => board._id !== deleteBoardId
      );
      setBoards(updatedBoards);

      document.getElementById("deleteConfirmationModalBoard").close();

      if (deleteBoardId === userBoard._id) {
        linkToMoosages(null); // re-render moosages
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation modal
    document.getElementById("deleteConfirmationModalBoard").close();
  };

  const linkToMoosages = (board) => {
    setUserBoard(board);
  };

  return (
    <div>
      <div>
        {isEditingBoard ? (
          <>
            <div className="form-control">
              <input
                type="text"
                name="title"
                value={editedBoard.title}
                onChange={handleBoardInputChange}
                className="input input-bordered min-w-[350px] max-w-[350px] mb-2"
              />
              <input
                type="text"
                name="description"
                placeholder="What's this board about?"
                value={editedBoard.description}
                onChange={handleBoardInputChange}
                className="input input-bordered min-w-[350px] max-w-[350px]"
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
                  checked={editedBoard.is_public}
                  onChange={(e) =>
                    handleBoardInputChange({
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
        ) : (
          <>
            <div className="indicator">
              {isDeleteClicked ? (
                <span
                  className="indicator-item indicator-top indicator-end badge badge-error text-error-content"
                  onClick={() => handleDeleteClick(board._id)}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="0" y1="12" x2="24" y2="12"></line>
                  </svg>
                </span>
              ) : isEditClicked ? (
                <span
                  className="indicator-item indicator-top indicator-end badge badge-warning text-warning-content"
                  onClick={handleBoardEditClick}
                  style={{ cursor: "pointer" }}
                >
                  <span
                    style={{ fontSize: "18px", fontFamily: "Times New Roman" }}
                  >
                    I
                  </span>
                </span>
              ) : isCopyClicked ? (
                <span
                  className="indicator-item indicator-top indicator-end badge badge-secondary text-secondary-content"
                  onClick={handleBoardCopyClick}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ fontFamily: "Arial" }}>Copy</span>
                </span>
              ) : (
                <span className="indicator-item indicator-top indicator-end badge">
                  {board.moosages.length}
                </span>
              )}

              {board.is_public ? null : (
                <span className="indicator-item indicator-bottom indicator-center badge badge-primary text-primary-content">
                  Private
                </span>
              )}
              <div className="grid min-w-[350px] max-w-[350px] min-h-[40px] bg-primary/30 place-items-center p-0.5 text-primary text-balance petit-formal rounded-lg hover:bg-primary/60">
                <div
                  className="collapse bg-base-100"
                  onClick={() => linkToMoosages(board)}
                >
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title text-2xl text-center text-base-content">
                    {board.title}
                  </div>
                  <div className="collapse-content text-base-content">
                    <p>{board.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* start of delete modal */}
      <dialog id="deleteConfirmationModalBoard" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* button to close modal without any changes */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Your board is about to be deleted.
          </h3>
          <p>
            Are you sure you want to delete this board?
            <br />
            All moosages in the board will also be deleted.
          </p>
          <div className="py-4">
            <button
              className="btn btn-outline btn-error"
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </button>
            &nbsp;
            <button
              className="btn btn-ghost"
              onClick={() => handleCancelDelete()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* end of delete modal */}

      {showToast && (
        <div className="toast toast-start" style={{ zIndex: 999 }}>
          <div className="alert alert-info">
            <span>URL copied!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardList;
