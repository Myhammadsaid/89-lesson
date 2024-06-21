import React from "react";
import "./Skeleton.css";

const Skeleton = () => {
  return (
    <div className="container">
      <div className="skeleton__cards">
        {Array(9)
          .fill("")
          .map((_, inx) => (
            <div key={inx} className="skeleton__card">
              <div className="skeleton__card__image"></div>
              <div className="skeleton__card__title"></div>
              <div className="skeleton__card__description"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skeleton;
