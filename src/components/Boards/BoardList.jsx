import React from "react";

const BoardList = ({ board }) => {
  
    
  return (
    <div>
      <div className="indicator">
        <span className="indicator-item indicator-top indicator-end badge badge-secondary">
          {board.moosages.length}
        </span>
        {board.is_public ? null : (
          <span className="indicator-item indicator-bottom indicator-center badge badge-ghost">
            Private
          </span>
        )}
        <div className="grid w-[200px] h-[40px] bg-neutral-content place-items-center p-1 text-neutral">
          {board.title}
        </div>
      </div>
      <div>{board._id}</div>
    </div>
  );
};

export default BoardList;
