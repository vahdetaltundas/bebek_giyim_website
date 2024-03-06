import Link from "next/link";
import React from "react";

const HorizontalCard = ({cardUrl,title,desc,imgUrl}) => {
  return (
    <Link
      href={cardUrl}
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"
    >
      <img
        className="object-cover w-full p-3 rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={imgUrl}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          {desc}
        </p>
      </div>
    </Link>
  );
};

export default HorizontalCard;