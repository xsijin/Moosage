import React, { useState } from "react";
import Mood from "../Mood/Mood";

const MoosageInput = ({ addMoosage }) => {
  const [newMoosage, setNewMoosage] = useState({
    userId: "65cfd9c270188fae2349b2b4", // replace this with the actual user ID
    message: "",
    moodUrl: null,
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
      moodUrl: null,
      is_public: true,
    });
  };

  return (
    <div className="add-moosage-form">
      <h2 className="bold">Share your moosage!</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          name="message"
          placeholder="Your moosage"
          value={newMoosage.message}
          onChange={handleInputChange}
          required
        ></textarea>
        <br />
        <Mood setMoodUrl={(url) => setNewMoosage((prevMoosage) => ({ ...prevMoosage, moodUrl: url }))} />
        <br />
        <label>
          <input
            type="checkbox"
            name="is_public"
            checked={newMoosage.is_public}
            onChange={(e) =>
              handleInputChange({
                target: { name: e.target.name, value: e.target.checked },
              })
            }
          />
          Public
        </label>
        <br />
        <button type="submit">Submit Moosage</button>
      </form>
    </div>
  );
};

export default MoosageInput;