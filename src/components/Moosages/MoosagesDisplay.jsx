import React, { useEffect, useState } from "react";
import "./Moosages.css";

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
}) => {
  if (!moosage) return null;
  console.log(moosage);

  const [editedMoosage, setEditedMoosage] = useState({
    // Initialize with empty values or default values
    userId: "65cfd9c270188fae2349b2b4", // replace this with the actual user ID
    message: "",
    moodUrl: null,
    is_public: true,
  });
  // const [selectedMoosageId, setSelectedMoosageId] = useState(null);
  // const [deleteMoosageId , setDeleteMoosageId] = useState(null);

  // Edit button - opens the modal
  const handleEditClick = (moosage) => {
    setEditedMoosage(moosage);
    setSelectedMoosageId(moosage._id);
    document.getElementById("my_modal_3").showModal();
  };

  const handleInputChange = (e) => {
    // Update the editedMoosage state when the form inputs change
    setEditedMoosage({
      ...editedMoosage,
      [e.target.name]: e.target.value,
    });
  };

  // calls the patch function to edit moosage
  const handlePatchSubmit = async (e) => {
    e.preventDefault();

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

      // Close the modal after a successful update
      document.getElementById("my_modal_3").close();

      // Fetch the updated moosages again to reflect the changes immediately
      const updatedResponse = await fetch(
        `https://moosage-backend.onrender.com/moosages/show/${boardId}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated moosages");
      }
      const updatedData = await updatedResponse.json();
      setMoosages(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete feature - opens modal
  const handleDeleteClick = async (id) => {
    setDeleteMoosageId(id);
    document.getElementById("deleteConfirmationModal").showModal();
    console.log(`To delete moosage with ID: ${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(`Starting deletion process for ${deleteMoosageId}`);

      const response = await fetch(
        `https://moosage-backend.onrender.com/moosages/remove/${deleteMoosageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Failed to delete moosage");
      }

      console.log("Moosage deleted successfully");

      const updatedMoosages = moosages.filter(
        (moosage) => moosage._id !== deleteMoosageId
      );
      setMoosages(updatedMoosages);

      console.log("State updated:", updatedMoosages);

      document.getElementById("deleteConfirmationModal").close();
      console.log("Modal closed");
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
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  return (
    <>
      <div>
        <div className="card lg:card-side bg-base-100 shadow-xl w-96">
          <figure className="p-4 hover:p-3" style={{ minWidth: "90px" }}>
            <img src={moosage.moodUrl} alt="Mood" />
          </figure>
          <div className="card-body">
            <p className="quote relative">{moosage.message}</p>

            <div className="absolute inset-x-0 bottom-0">
              <span className="badge m-1">
                {moosage.userId.preferredName} · {formatDate(moosage.createdAt)} . {moosage._id}
              </span>
            </div>

            <div className="card-actions justify-end">
              {/* only admin, board owner or moosage owner have access to edit/delete moosage */}
              {/* {String(userId) === String(review.user) ||
                    (user && user.is_admin) ? ( */}
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="rgba(61, 120, 101, 1)"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
                >
                  <li onClick={() => handleEditClick(moosage)}>
                    <a>Edit</a>
                  </li>
                  <li onClick={() => handleDeleteClick(moosage._id)}>
                    <a>Delete</a>
                  </li>
                </ul>
              </div>
              {/* ) : null} */}

              {/* start of edit modal */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* button to close modal without any changes */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form onSubmit={handlePatchSubmit}>
                    <h3 className="font-bold text-lg">Edit Moosage</h3>
                    <div className="py-4">
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <input
                            key={value}
                            type="radio"
                            name="editRating"
                            className="mask mask-star-2 bg-yellow-400"
                            value={value}
                            checked={parseInt(editedMoosage.rating) === value}
                            onChange={() => handleStarChange(value)}
                          />
                        ))}
                      </div>
                      <br />
                      <input
                        type="text"
                        id="editTitle"
                        name="title"
                        placeholder="Your review title"
                        className="input input-bordered w-full max-w-xs titlemargin"
                        value={editedMoosage.title}
                        onChange={handleInputChange}
                      />

                      <textarea
                        id="editContent"
                        name="content"
                        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                        placeholder="Share your review here"
                        value={editedMoosage.content}
                        onChange={handleInputChange}
                        required
                      ></textarea>

                      <input
                        type="text"
                        title="Please include only 1 photo URL. We suggest using an image hosting site such as Imgur. Image will not appear if the link is broken."
                        id="editImage"
                        name="images"
                        placeholder="Add photo URL (if any)"
                        className="input input-bordered input-sm w-full max-w-xs"
                        value={editedMoosage.images}
                        onChange={handleInputChange}
                      />

                      <br />
                      <br />
                      <br />
                      <button type="submit" className="btn btn-submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              {/* end of edit modal*/}

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
                  <p>
                    Are you sure you want to delete this moosage?
                    <br />
                    This action cannot be undone.
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

              <button className="btn btn-accent btn-sm">Like</button>
            </div>
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default MoosageDisplay;
