import React, { useState } from "react";
import Mood from "../Mood/Mood";

const MoosageInput = ({ addMoosage }) => {
  const today = new Date();
  const todayDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [newMoosage, setNewMoosage] = useState({
    userId: "65cfd9c270188fae2349b2b4", // replace this with the actual user ID
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

    addMoosage(newMoosage);

    setNewMoosage({
      userId: "65cfd9c270188fae2349b2b4", // reset the form
      message: "",
      moodUrl:
        "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2709-fe0f.png",
      is_public: true,
    });
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-auto">
      <figure className="p-4 hover:p-3" style={{ minWidth: "90px" }}>
        <img src={newMoosage.moodUrl} alt="Mood" />
      </figure>
      <div className="card-body">
        <div className="add-moosage-form">
          <form onSubmit={handleSubmit}>
            <textarea
              name="message"
              placeholder="Got something to share? Spread the vibes! ✨"
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
            <br />

            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text"><div className="tooltip" data-tip="Unchecking this box will only allow admin, board owners and moosage owners (you!) to view.">Your moosage is available to public.</div></span>
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
            <button type="submit" className="btn btn-sm">Post your moosage!</button>
          </form>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <span className="badge">logged_in_user's_preferred_name · {todayDate}</span>
        </div>
      </div>
    </div>
  );
};

export default MoosageInput;
