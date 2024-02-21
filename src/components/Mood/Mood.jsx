import { useState } from 'react';
import './Mood.css';
import EmojiPicker from 'emoji-picker-react';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';

function Mood({ setMoodUrl }) {
  // const [moodUrl, setMoodUrl] = useState(null);
  // const [unified, setUnified] = useState(null);

  // Callback function to handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    // Extract the emoji character from the emoji data
    const selectedMood = emojiData.imageUrl;
    const selectedUnified = emojiData.unified;
    // Update the state with the selected emoji
    setMoodUrl(selectedMood);
    // setUnified(selectedUnified);
  };

  return (
      <div className="dropdown-container">
        {/* Pass the handleEmojiClick function to the onEmojiClick prop */}
        <EmojiPicker onEmojiClick={handleEmojiClick} reactionsDefaultOpen={true} theme={Theme.AUTO} />
      </div>
  );
}

export default Mood;