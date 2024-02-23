import React, { useState } from "react";
import MoosagesLanding from '../Moosages/MoosagesLanding';
import BoardsLanding from '../Boards/BoardsLanding';

const Homepage = () => {
 
  return (
    <div>
      <BoardsLanding />
      <MoosagesLanding />
    </div>
  );
};

export default Homepage;
