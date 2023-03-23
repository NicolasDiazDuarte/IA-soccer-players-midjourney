import React from 'react'

import { download } from '../assets'
import { downloadImage } from '../utils'

const Card = ({ _id, name, team, photo, version, nftID, rating, age, position }) => (
  <div className="rounded-xl group relative shadow-card h">
    <div className=" absolute text-[#0ce85d] border-4 border-[#0ce85d] rounded-full ml-auto text-4xl font-extrabold right-6 top-0">
      <p className="p-1">{rating}</p>
    </div>
    <img className="w-72 h-auto  border-4 border-black object-cover rounded-t-xl" src={photo} />
    <div className=" w-72  border-2 border-black flex-col object-cover max-h-[94.5%] bottom-0 left-0 right-0  bg-gradient-to-r from-[#e1d5e6] to-neutral-100 p-2 rounded-b-md">
      <div className="flex justify-between items-center gap-2">
        <p className="text-[#666e75] text-sm overflow-y-auto prompt">#{nftID}</p>
        {/* <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="outline-none bg-transparent border-none"
        >
          <img src={download} alt="download" className="w-6 h-6 object-contain" />
        </button> */}
      </div>
      <div className="flex items-center">
        <p className="text-black text-xl font-extrabold truncate">{name}</p>
        <div className="text-white border-2 bg-black rounded-full ml-auto text-xl font-extrabold right-0 top-0">
          <p className="p-1">{position}</p>
        </div>
      </div>
      <p className="text-[#666e75] text-md  overflow-y-auto prompt">Team: {team}</p>
      <p className="text-[#666e75] text-md  overflow-y-auto prompt">Age: {age}</p>
      <p className="flex justify-center mt-1 text-white text-xl rounded-full border-1 bg-black font-extrabold m-auto prompt">
        {version}
      </p>
    </div>
  </div>
)

export default Card
