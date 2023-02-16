import React, {useEffect} from "react";

function FullPanel({ children, wrapperClassName, contentClassName, onToggle, onHide }) {

  useEffect(() => {
    const BodyDOM = document.body
    if(onToggle) {
      BodyDOM.style.overflowY = "hidden"
    } else {
      BodyDOM.style.overflowY = "auto"
    }
  }, [onToggle])

  return (
    <div
      className={`${
        onToggle ? "left-0" : "-left-full"
      } ${wrapperClassName && wrapperClassName} w-100 transition-all h-100 duration-500 overflow-x-hidden box-border rounded-lg flex flex-col md:hidden inset-0 gap-2 fixed z-[999]  bg-white shadow-xl`}
    >
      <div className={`${contentClassName && contentClassName} flex flex-col relative p-3`}>
        <i className="fa-solid fa-xmark absolute top-7 right-5 fa-lg" onClick={onHide}></i>
        {children}
      </div>
    </div>
  );
}

export default FullPanel;
