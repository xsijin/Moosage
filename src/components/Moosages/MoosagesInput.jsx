import React, { useState } from "react";
import Mood from "../Mood/Mood";

const MoosageInput = ({ addMoosage, user }) => {
  const today = new Date();
  const todayDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [newMoosage, setNewMoosage] = useState({
    userId: user.userId,
    message: "",
    moodUrl:
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2709-fe0f.png",
    is_public: true,
  });

  const handleInputChange = (e) => {
    setNewMoosage({
      ...newMoosage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newMoosage.moodUrl) {
      delete newMoosage.moodUrl; // ensures that if no emoji is selected, the moodUrl property is not included in the data sent to the backend, so that backend can auto populate it.
    }

    // Trim the message
    const trimmedMessage = newMoosage.message.trim();

    // Check if the trimmed message is empty
    if (trimmedMessage === "") {
      // Show an error message
      console.error(
        "Moosage cannot be empty or all spaces, please write a moosage to proceed."
      );
      return;
    }

    addMoosage(newMoosage);

    setNewMoosage({
      userId: user.userId,
      message: "",
      moodUrl:
        "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2709-fe0f.png",
      is_public: true,
    });
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-[500px] border border-primary hover:border-primary-content flex space-x-4">
      <figure className="p-4" style={{ minWidth: "90px" }}>
        <img src={newMoosage.moodUrl} alt="Mood" />
      </figure>
      <div className="card-body">
        <div className="add-moosage-form">
          <form onSubmit={handleSubmit}>
            <textarea
              name="message"
              placeholder="Got something to share? Let's vibe! ✨"
              value={newMoosage.message}
              onChange={handleInputChange}
              required
              className="textarea textarea-bordered textarea-md w-full max-w-xs"
            ></textarea>
            <br />
            <Mood
              setMoodUrl={(url) =>
                setNewMoosage((prevMoosage) => ({
                  ...prevMoosage,
                  moodUrl: url,
                }))
              }
            />

            <div className="form-control items-end">
              <label className="cursor-pointer label">
                <span className="label-text">
                  <div
                    className="tooltip"
                    data-tip="Unchecking this box will only allow admin, board owners and moosage owners (you!) to view."
                  >
                    Public
                  </div>
                </span>
                &nbsp;
                <input
                  type="checkbox"
                  name="is_public"
                  checked={newMoosage.is_public}
                  onChange={(e) =>
                    handleInputChange({
                      target: { name: e.target.name, value: e.target.checked },
                    })
                  }
                  className="checkbox checkbox-warning"
                />
              </label>
            </div>
            <button type="submit" className="btn btn-sm">
              Post your moosage!
            </button>
          </form>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <span className="badge m-1">
            logged_in_user's_preferred_name · {todayDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoosageInput;
