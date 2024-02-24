import React, { useState, useEffect } from "react";

const BoardList = ({
  board,
  isDeleteClicked,
  isEditClicked,
  setBoards,
  boardId,
  boards,
  deleteBoardId,
  setDeleteBoardId,
  userId,
  selectedBoardId,
  setSelectedBoardId,
  cancelToken,
  setBoardId,
}) => {
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [editedBoard, setEditedBoard] = useState({
    // userId: moosage.userId,
    title: board.title,
    description: board.description,
    is_public: board.is_public,
  });

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
    await handleBoardPatchSubmit();
    setIsEditingBoard(false);
  };

  const handleBoardPatchSubmit = async () => {
    try {
      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/update/${board._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
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

      // Update the state directly
      setBoards(
        boards.map((updatedBoard) =>
          updatedBoard._id === board._id
            ? {
                ...updatedBoard,
                title: editedBoard.title,
                description: editedBoard.description,
                is_public: editedBoard.is_public,
              }
            : updatedBoard
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsEditingBoard(false);
  }, [cancelToken]);

  // Delete feature - opens modal
  const handleDeleteClick = async (id) => {
    setDeleteBoardId(id);
    document.getElementById("deleteConfirmationModalBoard").showModal();
    console.log(`To delete board with ID: ${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Starting deletion process for ${deleteBoardId}`);

      const response = await fetch(
        `https://moosage-backend.onrender.com/boards/remove/${deleteBoardId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Failed to delete board");
      }

      console.log("Board deleted successfully");

      const updatedBoards = boards.filter(
        (board) => board._id !== deleteBoardId
      );
      setBoards(updatedBoards);

      console.log("State updated:", updatedBoards);

      document.getElementById("deleteConfirmationModalBoard").close();
      console.log("Modal closed");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation modal
    document.getElementById("deleteConfirmationModalBoard").close();
  };

  const linkToMoosages = (id) => {
    setBoardId(id);
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
                className="input input-bordered min-w-[400px] max-w-[400px] mb-2"
              />
              <input
                type="text"
                name="description"
                placeholder="What's this board about?"
                value={editedBoard.description}
                onChange={handleBoardInputChange}
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
                  className="indicator-item indicator-top indicator-end badge badge-error text-secondary-content"
                  onClick={() => handleDeleteClick(board._id)}
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
                  className="indicator-item indicator-top indicator-end badge badge-warning text-secondary-content"
                  onClick={handleBoardEditClick}
                >
                  <span
                    style={{ fontSize: "18px", fontFamily: "Times New Roman" }}
                  >
                    I
                  </span>
                </span>
              ) : (
                <span className="indicator-item indicator-top indicator-end badge">
                  {board.moosages.length}
                </span>
              )}

              {board.is_public ? null : (
                <span className="indicator-item indicator-bottom indicator-center badge badge-ghost">
                  Private
                </span>
              )}
              <div className="grid min-w-[400px] max-w-[400px] min-h-[40px] bg-neutral-content place-items-center p-1 text-neutral text-balance petit-formal">
                <div
                  className="collapse bg-base-200"
                  onClick={() => linkToMoosages(board._id)}
                >
                  <input type="radio" name="my-accordion-1" />
                  <div className="collapse-title text-2xl font-medium text-center">
                    {board.title}
                  </div>
                  <div className="collapse-content">
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
    </div>
  );
};

export default BoardList;
