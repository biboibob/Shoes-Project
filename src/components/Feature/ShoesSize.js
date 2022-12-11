import React from 'react'

function ShoesSize({size, onChange, selected, name = "size", className}) {

  return (
    <div className="flex flex-wrap gap-2">
      {size.map((val, idx) => {
        return (
          <div
            className={`${className} text-sm md:text-base py-1 px-2 rounded-md cursor-pointer ${
              val === selected ? "bg-red-pallete text-white" : "bg-dark-gray"
            }`}
            style={{ backgroundColor: val }}
            key={idx}
            onClick={() => onChange(name, val)}
          >
            {val}
          </div>
        );
      })}
    </div>
  );
  
}

export default ShoesSize