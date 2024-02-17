import React from "react";

const ProductCard = () => {
  return (
    <>
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <a href="#!">
          <img
            className="rounded-t-lg"
            src="https://cdn05.e-bebek.com/mnresize/1600/1600/media/p/lover-elbise-kiz-bebek_8682766576719_01.jpg"
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800">
            Elbise Kız Bebek
          </h5>
          <p className="mb-4 text-base text-neutral-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
            itaque maxime{" "}
          </p>
          {/* Butonu buraya ekliyoruz */}
          <div className="text-center">
            <button
              type="button"
              className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init=""
              data-te-ripple-color="light"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
