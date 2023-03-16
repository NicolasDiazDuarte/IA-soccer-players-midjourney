import mongoose from 'mongoose'

const Player = new mongoose.Schema({
  nftID: { type: String, required: true, minLength: 7 },
  name: { type: String, required: true },
  version: { type: Number, required: true },
  age: { type: Number },
  rating: { type: Number, min: 1, max: 99 },
  position: { type: String, enum: ['GK', 'CB', 'LB', 'RB', 'CDM', 'MCO', 'RM', 'LM', 'CM', 'ED', 'EI', 'SD', 'DC'] },
  team: { type: String, required: true },
  photo: { type: String, required: true },
})

const PlayerSchema = mongoose.model('Player', Player)

export default PlayerSchema
