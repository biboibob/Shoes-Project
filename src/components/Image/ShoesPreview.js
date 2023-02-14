import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

/* Redux Action */
import { skeletonToggle} from "../../service/redux/slice/ui";

//Component
import { Card } from "../../components/custom/index";

function ShoesPreview({ asset, className, responsive }) {

  /* Redux */
  const dispatch = useDispatch();
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4];
  const [selected, setSelected] = useState({
    src: "",
    index: 0,
  });

  useEffect(() => {
    setSelected({
      src: asset[0]?.URL,
      index: 0,
    });
  }, [asset]);

  const onHandleSelect = (val, idx) => {
    setSelected({
      src: val,
      index: idx,
    });
  };

  return !uiSelector.skeleton ? (
    <div
      className={`${className} flex justify-evenly h-fit my-3 gap-3 items-center ${
        responsive ? "flex-row md:!flex-col" : "flex-col"
      } `}
    >
      <img
        src={selected.src}
        className={"max-w-[15rem] md:max-w-[30rem] h-auto"}
      />
      <div
        className={`flex ${
          responsive ? "flex-col md:flex-row" : "flex-row"
        } gap-3 justify-center`}
      >
        {asset.map((val, idx) => (
          <div key={idx}>
            <Card
              onClick={() => onHandleSelect(val?.URL, idx)}
              className={`border-2 cursor-pointer ${
                idx === selected.index ? "border-black" : "border-white"
              }`}
            >
              <img
                src={val?.URL}
                className="max-w-[3rem] md:max-w-[5rem] h-auto"
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Skeleton
    containerClassName={`${className} flex animate-pulse gap-4 h-full my-3 items-center ${
        responsive ? "flex-row md:!flex-col" : "flex-col"
      } `}
      wrapper={() => (
        <>
          <div className="w-[10rem] md:w-[25rem] bg-dark-gray h-52 md:h-80 rounded-xl"></div>
          <div
            className={`flex ${
              responsive ? "flex-col md:flex-row" : "flex-row"
            } gap-3 justify-center`}
          >
            {dummy.map((val, idx) => (
              <div key={idx} className={`w-[3rem] md:w-[5rem] bg-dark-gray h-16 rounded-lg`}/>
            ))}
          </div>
        </>
      )}
    />
  );
}

export default ShoesPreview;
