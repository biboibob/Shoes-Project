import React, { useState, useEffect } from "react";

//Component
import { Card } from "../../components/custom/index";

function ShoesPreview({ asset, className, responsive }) {
  const [selected, setSelected] = useState({
    src: "",
    index: 0,
  });

  useEffect(() => {
    const arr = Object.entries(asset);

    setSelected({
      src: arr[3][1],
      index: 3,
    });
  }, []);

  const onHandleSelect = (val, idx) => {
    setSelected({
      src: val,
      index: idx,
    });
  };

  return (
    <>
      <div className={`${className} ${responsive ? "flex-row md:!flex-col" : "flex-col"} items-center`}>
        <img src={selected.src} className={"max-w-[15rem] md:max-w-[30rem] h-auto"} />
        <div className={`flex ${responsive ? "flex-col md:flex-row" : "flex-row"} gap-3 justify-center`}>
          {Object.keys(asset).map((val, idx) => (
            <div key={idx}>
              <Card
                onClick={() => onHandleSelect(asset[val], idx)}
                className={`border-2 cursor-pointer ${idx === selected.index ? "border-black" : "border-white"}`}
              >
                <img src={asset[val]} className="max-w-[3rem] md:max-w-[5rem] h-auto" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShoesPreview;
