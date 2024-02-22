import { useState, useContext, useEffect } from "react";
import ThemeContext from "../../ThemeContext";
import "./Mood.css";
import EmojiPicker, { Emoji, EmojiStyle, Theme } from "emoji-picker-react";

function Mood({ setMoodUrl }) {
  const selectedTheme = useContext(ThemeContext);
  const [theme, setTheme] = useState(Theme.LIGHT); // Initialize theme to light

  // Callback function to handle theme change
  const handleEmojiThemeChange = () => {
    switch (selectedTheme) {
      case "forest":
      case "night":
        setTheme(Theme.DARK);
        break;
      case "light":
      case "emerald":
      case "winter":
      default:
        setTheme(Theme.LIGHT);
        break;
    }
  };

  // Use useEffect to call handleEmojiThemeChange whenever selectedTheme changes
  useEffect(() => {
    handleEmojiThemeChange();
  }, [selectedTheme]);

  // Callback function to handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    const selectedMood = emojiData.imageUrl;
    setMoodUrl(selectedMood);
  };

  return (
    <div className="dropdown-container">
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        reactionsDefaultOpen={true}
        theme={theme}
      />
    </div>
  );
}

export default Mood;
