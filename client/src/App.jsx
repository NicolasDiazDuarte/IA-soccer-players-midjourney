import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { background, midjourney, players } from './assets'
import { Home, CreatePost } from './page'
import ShowPosts from './page/ShowPosts'

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-2 py-2 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={midjourney} alt="mid" className="w-12 object-contain" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-2 py-2 rounded-md">
        Create
      </Link>
    </header>

    <img src={background} className="w-screen h-screen object-cover absolute"></img>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] z-1 ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/show-posts" element={<ShowPosts />} />
      </Routes>
    </main>
  </BrowserRouter>
)

export default App
