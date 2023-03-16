import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import PlayerSchema from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.route('/').get(async (req, res) => {
  try {
    const posts = await PlayerSchema.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' })
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { name, team, version, photo, nftID, position, age, rating } = req.body
    const photoUrl = await cloudinary.uploader.upload(photo)

    const newPost = await PlayerSchema.create({
      nftID,
      rating,
      position,
      age,
      name,
      team,
      version,
      photo: photoUrl.url,
    })

    res.status(200).json({ success: true, data: newPost })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' })
  }
})

export default router
