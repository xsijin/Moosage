import { useState } from 'react';
import './Mood.css';
import EmojiPicker, { Emoji, EmojiStyle, Theme } from 'emoji-picker-react';

function Mood({ setMoodUrl }) {
  const [theme, setTheme] = useState(Theme.LIGHT); // Initialize theme to light

  // Callback function to handle theme change
  const handleEmojiThemeChange = () => {
    setTheme(prevTheme => prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  // Callback function to handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    const selectedMood = emojiData.imageUrl;
    setMoodUrl(selectedMood);
  };

  return (
    <div className="dropdown-container">
      <EmojiPicker onEmojiClick={handleEmojiClick} reactionsDefaultOpen={true} theme={theme} />
    </div>
  );
}

export default Mood;