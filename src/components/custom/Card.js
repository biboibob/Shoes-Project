import React from "react";

function Card(props) {
  const { className, onClick, keys } = props;
  return (
    <div
      className={`${className} rounded-md bg-white`}
      onClick={onClick}
      key={keys}
    >
      {props.children}
    </div>
  );
}

export default Card;
