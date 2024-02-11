import React from 'react';

const Card = ({ fName, lName, gender, phNumber, imageSrc }) => {
  return (
    <div className="border border-gray-300 rounded-xl shadow-md p-4 bg-white w-96 grid grid-cols-2">
      <div className="col-span-1 flex justify-center items-center">
        <img className="w-40 h-40 rounded-xl" src={imageSrc} alt={`${fName} ${lName}`} />
      </div>
      <div>
        <div className="flex justify-around pb-2">
          <p>{fName}</p>
          <p>{lName}</p>
        </div>
        <p className="pb-2 pl-5">{gender}</p>
        <p className="pl-5">{phNumber}</p>
      </div>
    </div>
  );
};

export default Card;
