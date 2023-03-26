import React from 'react'
import '../card.scss'

const Card = ({ _id, name, team, photo, version, nftID, rating, age, position }) => (
  <div class="group relative shadow-card cards--three cards rounded-lg">
    <span class="cards--three__rect-2">
      <span class="shadow-2"></span>
    </span>
    <ul class="cards--three__list">
      <li class="p-1 text-[#77f0ba] font-extrabold">{rating}</li>
    </ul>
    <img class="h-auto border-4 border-black object-cover rounded-t-xl" src={photo} />
    <span class="cards--three__circle"></span>
    <div class="border-2 border-black max-h-[94.5%] bg-blue-100 p-2 rounded-b-md shadow-md flex flex-col justify-between">
      <div class="flex justify-between items-center mb-2">
        <p class="text-[#666e75] text-sm font-bold uppercase tracking-widest">#{nftID}</p>
        <div class="text-white bg-black rounded-full text-xl font-extrabold px-2 py-1">{position}</div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col items-center">
          <p class="text-black text-xl font-extrabold truncate text-center w-full whitespace-nowrap group-hover:text-2xl">
            {name}
          </p>
          <p class="text-[#666e75] text-md font-semibold uppercase tracking-wide overflow-y-auto prompt">{team}</p>
          <p class="text-[#666e75] text-md font-semibold uppercase tracking-wide overflow-y-auto prompt">Age: {age}</p>
        </div>
      </div>
      <p class="flex justify-center mt-2 text-black text-2xl rounded-full border-2 bg-gradient-to-t from-[#a8dadc] to-[#d5f5f6] font-extrabold px-4 py-1 prompt group-hover:from-[#bbeeff] group-hover:to-[#ffb7c5]">
        {version}
      </p>
    </div>
  </div>
)

export default Card
