import { useState } from 'react';
import './Mood.css';
import Emoji from 'react-emojis';


function Mood() {
  const [mood, setMood] = useState(null);

  const handleMoodChange = (event) => {
    const selectedMood = event.target.value;
    setMood(selectedMood);
  };

  return (
    <>
      <div className="dropdown-container">
        {/* Dropdown list */}
        <select value={mood} onChange={handleMoodChange} className="dropdown">
          <option value="">Select a mood</option>
          <option value="slightly-smiling-face"><Emoji emoji="slightly-smiling-face" /></option>
          <option value="smiling-face-with-smiling-eyes"><Emoji emoji="smiling-face-with-smiling-eyes" /></option>
          <option value="grinning-face"><Emoji emoji="grinning-face" /></option>

          <option value="grinning-face-with-smiling-eyes"><Emoji emoji="grinning-face-with-smiling-eyes" /></option>
          <option value="beaming-face-with-smiling-eyes"><Emoji emoji="beaming-face-with-smiling-eyes" /></option>
          <option value="grinning-squinting-face"><Emoji emoji="grinning-squinting-face" /></option>

          <option value="grinning-face-with-sweat"><Emoji emoji="grinning-face-with-sweat" /></option>
          <option value="face-with-tears-of-joy"><Emoji emoji="face-with-tears-of-joy" /></option>
          <option value="winking-face"><Emoji emoji="winking-face" /></option>

          <option value="smiling-face-with-halo"><Emoji emoji="smiling-face-with-halo" /></option>
          <option value="smiling-face-with-hearts"><Emoji emoji="smiling-face-with-hearts" /></option>
          <option value="smiling-face-with-heart-eyes"><Emoji emoji="smiling-face-with-heart-eyes" /></option>

          <option value="star-struck"><Emoji emoji="star-struck" /></option>
          <option value="face-blowing-a-kiss"><Emoji emoji="face-blowing-a-kiss" /></option>
          <option value="kissing-face-with-smiling-eyes"><Emoji emoji="kissing-face-with-smiling-eyes" /></option>

          <option value="face-savoring-food"><Emoji emoji="face-savoring-food" /></option>
          <option value="face-with-tongue"><Emoji emoji="face-with-tongue" /></option>
          <option value="zany-face"><Emoji emoji="zany-face" /></option>

          <option value="squinting-face-with-tongue"><Emoji emoji="squinting-face-with-tongue" /></option>
          <option value="money-mouth-face"><Emoji emoji="money-mouth-face" /></option>
          <option value="hugging-face"><Emoji emoji="hugging-face" /></option>

          <option value="face-with-hand-over-mouth"><Emoji emoji="face-with-hand-over-mouth" /></option>
          <option value="shushing-face"><Emoji emoji="shushing-face" /></option>
          <option value="thinking-face"><Emoji emoji="thinking-face" /></option>

          <option value="face-with-raised-eyebrow"><Emoji emoji="face-with-raised-eyebrow" /></option>
          <option value="neutral-face"><Emoji emoji="neutral-face" /></option>
          <option value="expressionless-face"><Emoji emoji="expressionless-face" /></option>

          <option value="face-without-mouth"><Emoji emoji="face-without-mouth" /></option>
          <option value="face-with-rolling-eyes"><Emoji emoji="face-with-rolling-eyes" /></option>
          <option value="relieved-face"><Emoji emoji="relieved-face" /></option>

          <option value="pensive-face"><Emoji emoji="pensive-face" /></option>
          <option value="sleepy-face"><Emoji emoji="sleepy-face" /></option>
          <option value="sleeping-face"><Emoji emoji="sleeping-face" /></option>

          <option value="face-with-medical-mask"><Emoji emoji="face-with-medical-mask" /></option>
          <option value="face-with-thermometer"><Emoji emoji="face-with-thermometer" /></option>
          <option value="nauseated-face"><Emoji emoji="nauseated-face" /></option>

          <option value="face-vomiting"><Emoji emoji="face-vomiting" /></option>
          <option value="hot-face"><Emoji emoji="hot-face" /></option>
          <option value="cold-face"><Emoji emoji="cold-face" /></option>

          <option value="dizzy-face"><Emoji emoji="dizzy-face" /></option>
          <option value="exploding-head"><Emoji emoji="exploding-head" /></option>
          <option value="partying-face"><Emoji emoji="partying-face" /></option>

          <option value="smiling-face-with-sunglasses"><Emoji emoji="smiling-face-with-sunglasses" /></option>
          <option value="nerd-face"><Emoji emoji="nerd-face" /></option>
          <option value="confused-face"><Emoji emoji="confused-face" /></option>

          <option value="slightly-frowning-face"><Emoji emoji="slightly-frowning-face" /></option>
          <option value="face-with-open-mouth"><Emoji emoji="face-with-open-mouth" /></option>
          <option value="flushed-face"><Emoji emoji="flushed-face" /></option>

          <option value="pleading-face"><Emoji emoji="pleading-face" /></option>
          <option value="anxious-face-with-sweat"><Emoji emoji="anxious-face-with-sweat" /></option>
          <option value="sad-but-relieved-face"><Emoji emoji="sad-but-relieved-face" /></option>

          <option value="crying-face"><Emoji emoji="crying-face" /></option>
          <option value="loudly-crying-face"><Emoji emoji="loudly-crying-face" /></option>
          <option value="face-screaming-in-fear"><Emoji emoji="face-screaming-in-fear" /></option>

          <option value="confounded-face"><Emoji emoji="confounded-face" /></option>
          <option value="persevering-face"><Emoji emoji="persevering-face" /></option>
          <option value="disappointed-face"><Emoji emoji="disappointed-face" /></option>

          <option value="downcast-face-with-sweat"><Emoji emoji="downcast-face-with-sweat" /></option>
          <option value="weary-face"><Emoji emoji="weary-face" /></option>
          <option value="tired-face"><Emoji emoji="tired-face" /></option>

          <option value="pouting-face"><Emoji emoji="pouting-face" /></option>
          <option value="angry-face"><Emoji emoji="angry-face" /></option>
          <option value="face-with-symbols-on-mouth"><Emoji emoji="face-with-symbols-on-mouth" /></option>

          <option value="smiling-face-with-horns"><Emoji emoji="smiling-face-with-horns" /></option>
          <option value="angry-face-with-horns"><Emoji emoji="angry-face-with-horns" /></option>
          <option value="pile-of-poo"><Emoji emoji="pile-of-poo" /></option>

          <option value="skull"><Emoji emoji="skull" /></option>
          <option value="clown-face"><Emoji emoji="clown-face" /></option>
          <option value="ghost"><Emoji emoji="ghost" /></option>

          <option value="alien"><Emoji emoji="alien" /></option>
          <option value="robot"><Emoji emoji="robot" /></option>
          <option value="grinning-cat"><Emoji emoji="grinning-cat" /></option>

          <option value="grinning-cat-with-smiling-eyes"><Emoji emoji="grinning-cat-with-smiling-eyes" /></option>
          <option value="cat-with-tears-of-joy"><Emoji emoji="cat-with-tears-of-joy" /></option>
          <option value="smiling-cat-with-heart-eyes"><Emoji emoji="smiling-cat-with-heart-eyes" /></option>

          <option value="cat-with-wry-smile"><Emoji emoji="cat-with-wry-smile" /></option>
          <option value="kissing-cat"><Emoji emoji="kissing-cat" /></option>
          <option value="weary-cat"><Emoji emoji="weary-cat" /></option>

          <option value="crying-cat"><Emoji emoji="crying-cat" /></option>
          <option value="pouting-cat"><Emoji emoji="pouting-cat" /></option>
          <option value="see-no-evil-monkey"><Emoji emoji="see-no-evil-monkey" /></option>

          <option value="hear-no-evil-monkey"><Emoji emoji="hear-no-evil-monkey" /></option>
          <option value="speak-no-evil-monkey"><Emoji emoji="speak-no-evil-monkey" /></option>
          <option value="love-letter"><Emoji emoji="love-letter" /></option>
          <option value="sparkling-heart"><Emoji emoji="sparkling-heart" /></option>
        </select>
        </div>
        {/* Render the selected emoji based on the mood */}
        {mood && <Emoji emoji={mood} size={75} />}
      
    </>
  );
}

export default Mood;