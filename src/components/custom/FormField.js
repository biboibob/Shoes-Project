import React from "react";

function textField(props) {
  const { vertical, label, value } = props;

  return (
    <div className={`flex gap-2 ${!vertical ? "flex-row" : "flex-col"}`}>
      <div className={`${!vertical ? "w-25" : "w-full"}`}>
        <span>{label} :</span>
      </div>
      <div className={`${!vertical ? "w-75" : "w-full"}`}>
        <input
          className="border-solid border-2 border-black w-full"
          value={value}
        />
      </div>
    </div>
  );
}

export default textField;
