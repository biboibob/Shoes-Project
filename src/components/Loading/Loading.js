import React from "react";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

//Asset
import LoadingSpin from "../../assets/SVG/LoadingFetch.svg";

function Loading({ children }) {
  // Redux State
  const isLoadingSelector = useSelector(
    (state) => state.userInterface.isLoading
  );

  return (
    <div className={`flex flex-col relative ${isLoadingSelector && "overflow-y-hidden"} bg-soft-gray-2 min-h-screen`}>
      {isLoadingSelector && (
        <div className="flex justify-center items-center absolute z-[99999] inset-0 h-screen w-full !bg-soft-black opacity-80">
          <img src={LoadingSpin} className="w-14 md:w-24 h-auto"/>
        </div>
      )}
      {children}
    </div>
  );
}

export default Loading;
