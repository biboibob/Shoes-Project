import React from "react";

function FullPanel({ children, wrapperClassName, contentClassName, onToggle, onHide }) {
  return (
    <div
      className={`${
        onToggle ? "w-100" : "w-0"
      } ${wrapperClassName && wrapperClassName} transition-all h-100 duration-300 overflow-x-hidden box-border rounded-lg flex flex-col md:hidden inset-0 gap-2 fixed z-[999]  bg-white shadow-xl`}
    >
      <div className={`${contentClassName && contentClassName} flex flex-col relative p-3`}>
        <i className="fa-solid fa-xmark absolute top-7 right-5 fa-lg" onClick={onHide}></i>
        {children}
      </div>
    </div>
  );
}

export default FullPanel;
