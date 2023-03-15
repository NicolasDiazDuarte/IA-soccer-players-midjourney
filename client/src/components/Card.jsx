import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, team, photo, version, nftID }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover">
    <img
      className="w-72 h-auto  border-2 border-neutral-500 object-cover rounded-t-xl"
      src={photo}
    />
    <div className="group-hover:flex w-72  border-2 border-[#a5a7c3] flex-col object-cover max-h-[94.5%] bottom-0 left-0 right-0 bg-[#d8daff]  p-2 rounded-b-md">
      <div className="flex items-center gap-2">
        <p className="text-black text-lg font-bold">{name}</p>
      </div>
      <p className="text-black text-sm overflow-y-auto prompt">{team}</p>
      <p className="text-black text-sm overflow-y-auto prompt">{version}</p>
      <div className="mt-5 flex justify-between items-center gap-2">
        <p className="text-black text-xl font-bold overflow-y-auto prompt">
          #{nftID}
        </p>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="outline-none bg-transparent border-none"
        >
          <img
            src={download}
            alt="download"
            className="w-6 h-6 object-contain"
          />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
