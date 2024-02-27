import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Moosages.css";
import Mood from "../Mood/Mood";

const MoosageDisplay = ({
  moosage,
  boardId,
  moosages,
  moosageId,
  setMoosages,
  selectedMoosageId,
  setSelectedMoosageId,
  deleteMoosageId,
  setDeleteMoosageId,
  setResetToken,
  user,
}) => {
  if (!moosage) return null;
  console.log(moosage);

  const [isEditing, setIsEditing] = useState(false);
  const [editedMoosage, setEditedMoosage] = useState({
    // Initialize with empty values or default values
    userId: "65cfd9c270188fae2349b2b4", // replace this with the actual user ID
    message: "",
    moodUrl: null,
    is_public: true,
  });
  const [editMoodUrl, setEditMoodUrl] = useState(moosage.moodUrl);

  const handleEditClick = () => {
    setSelectedMoosageId(moosage._id);
    setEditedMoosage({
      // userId: moosage.userId,
      message: moosage.message,
      moodUrl: moosage.moodUrl,
      is_public: moosage.is_public,
    });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedMoosage({
      // userId: moosage.userId,
      message: moosage.message,
      moodUrl: moosage.moodUrl,
      is_public: moosage.is_public,
    });
  };

  const handleInputChange = (e) => {
    // Update the editedMoosage state when the form inputs change
    setEditedMoosage({
      ...editedMoosage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    // Trim the message
    const trimmedMessage = editedMoosage.message.trim();

    // Check if the trimmed message is empty
    if (trimmedMessage === "") {
      // Show an error message
      console.error(
        "Moosage cannot be empty or all spaces, please write a moosage to proceed."
      );
      return;
    }

    await handlePatchSubmit();
    setIsEditing(false);
  };

  // calls the patch function to edit moosage
  const handlePatchSubmit = async () => {
    try {
      // const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      // if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/update/${selectedMoosageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, // Include the authorization header
          },
          body: JSON.stringify({
            message: editedMoosage.message,
            moodUrl: editedMoosage.moodUrl,
            is_public: editedMoosage.is_public,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update moosage");
      }

      // Fetch the updated moosages again to reflect the changes immediately
      const updatedResponse = await fetch(
        `https://moosage-backend.onrender.com/moosages/show/${boardId}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated moosages");
      }
      const updatedData = await updatedResponse.json();
      setMoosages(updatedData);
      setResetToken((prevToken) => prevToken + 1); // trigger re-render of boards to show -1 moosage count (if user set moosage to private)
    } catch (error) {
      console.error(error);
    }
  };

  // Delete feature - opens modal
  const handleDeleteClick = async (id) => {
    setDeleteMoosageId(id);
    document.getElementById("deleteConfirmationModal").showModal();
    // console.log(`To delete moosage with ID: ${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      // console.log(`Starting deletion process for ${deleteMoosageId}`);

      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/remove/${deleteMoosageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Failed to delete moosage");
      }

      // console.log("Moosage deleted successfully");

      const updatedMoosages = moosages.filter(
        (moosage) => moosage._id !== deleteMoosageId
      );
      setMoosages(updatedMoosages);

      // console.log("State updated:", updatedMoosages);

      document.getElementById("deleteConfirmationModal").close();
      // console.log("Modal closed");
      setResetToken((prevToken) => prevToken + 1); // trigger re-render of boards to show -1 moosage count
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation modal
    document.getElementById("deleteConfirmationModal").close();
  };

  // re-format generated date/time
  const formatDate = (dateString) => {
    const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    // Add leading zero to the minutes if needed
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    const formattedTime = `${hours}:${minutes}${ampm}`;

    return `${formattedDate} · ${formattedTime}`;
  };

  return (
    <>
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl w-[500px] border border-primary hover:border-primary-content flex space-x-4">
          <figure className="p-4" style={{ minWidth: "90px" }}>
            <img src={isEditing ? editMoodUrl : moosage.moodUrl} alt="Mood" />
          </figure>
          <div className="card-body">
            {isEditing ? (
              <>
                <div className="add-moosage-form">
                  <form onSubmit={handleSaveClick}>
                    <textarea
                      name="message"
                      value={editedMoosage.message}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered textarea-md w-full max-w-xs"
                      style={{ whiteSpace: "pre-wrap" }}
                      required
                      pattern="\S+.*"
                    />

                    <Mood
                      setMoodUrl={(url) => {
                        setEditMoodUrl(url);
                        setEditedMoosage((prevMoosage) => ({
                          ...prevMoosage,
                          moodUrl: url,
                        }));
                      }}
                    />

                    <div className="form-control items-end">
                      <label className="cursor-pointer label">
                        <div
                          className="tooltip"
                          data-tip="Unchecking this box will only allow admin, board owners and moosage owners (you!) to view."
                        >
                          <span className="label-text">Public</span>
                        </div>
                        &nbsp;
                        <input
                          type="checkbox"
                          name="is_public"
                          checked={editedMoosage.is_public}
                          onChange={(e) =>
                            handleInputChange({
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
                      <button type="submit" className="btn btn-xs">
                        Save Changes
                      </button>

                      <button
                        onClick={handleCancelClick}
                        className="btn btn-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <p
                className="quote relative text-left indent-3 mali-regular text-balance"
                style={{ whiteSpace: "pre-line" }}
              >
                {moosage.message}
              </p>
            )}

            <div className="absolute inset-x-0 bottom-0">
              <span className="badge m-1">
                <Link
                  to={`/user/${moosage.userId._id}`}
                  className="hover:text-primary hover:font-bold"
                >
                  {moosage.userId.preferredName}
                </Link>
                &nbsp;· {formatDate(moosage.createdAt)}
                {moosage.createdAt !== moosage.updatedAt && " · edited"}
              </span>
              {moosage.is_public === false ? (
                <span className="badge m-1">Private</span>
              ) : null}
            </div>

            <div className="card-actions justify-end">
              {/* only admin, board owner or moosage owner have access to edit/delete moosage */}
              {/* {String(userId) === String(review.user) ||
                    (user && user.is_admin) ? ( */}

              {!isEditing && (
                <>
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
                    >
                      <li onClick={handleEditClick}>
                        <a>Edit</a>
                      </li>
                      <li onClick={() => handleDeleteClick(moosage._id)}>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                  {/* ) : null} */}

                  {/* start of delete modal */}
                  <dialog id="deleteConfirmationModal" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* button to close modal without any changes */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">
                        Your moosage is about to be deleted.
                      </h3>
                      <p>Are you sure you want to delete this moosage?</p>
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

                  <button className="btn btn-accent btn-sm">Like</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoosageDisplay;
