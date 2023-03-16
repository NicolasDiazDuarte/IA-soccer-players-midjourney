import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nftID: '',
    name: '',
    version: '',
    age: '',
    rating: '',
    position: '',
    team: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadData, setUploadData] = useState(null)

  function handleupload(changeEvent) {
    const reader = new FileReader()
    if (changeEvent?.target.files !== null) {
      reader.onload = function (onLoadEvent) {
        setForm({
          ...form,
          photo: `${onLoadEvent.target.result}`,
        })
        setUploadData(undefined)
      }
      reader.readAsDataURL(changeEvent?.target?.files[0])
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // const generateImage = async () => {
  //   if (form.prompt) {
  //     try {
  //       setGeneratingImg(true);
  //       const response = await fetch("http://localhost:8080/api/v1/dalle", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           prompt: form.prompt,
  //         }),
  //       });

  //       const data = await response.json();
  //       setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setGeneratingImg(false);
  //     }
  //   } else {
  //     alert("Please provide proper prompt");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.nftID && form.name && form.photo) {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        })

        await response.json()
        alert('Success')
        navigate('/')
      } catch (err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please generate an image with proper details')
    }
  }

  return (
    <section className="max-w-7xl mx-auto relative">
      <div>
        <h1 className="font-extrabold font-mono text-[#222328] text-5xl">Create a new Player</h1>
        <p className="mt-2 text-[#666e75] text-md max-w-[500px]">
          Upload a soccer card through Midjourney AI and share it with the community
        </p>
      </div>

      <form className="mt-10 max-w-3xl relative" onChange={handleupload} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Soccer card ID"
            type="text"
            name="nftID"
            placeholder="Ex. 0000001"
            value={form.nftID}
            handleChange={handleChange}
          />

          <FormField
            labelName="Player full name"
            type="text"
            name="name"
            placeholder="Ex Lionel Messi"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Version"
            type="Number"
            name="version"
            placeholder="2012"
            value={form.version}
            handleChange={handleChange}
          />

          <FormField
            labelName="Age"
            type="Number"
            name="age"
            placeholder="18"
            value={form.age}
            handleChange={handleChange}
          />

          <FormField
            labelName="Rating"
            type="Number"
            name="rating"
            placeholder="81"
            value={form.rating}
            handleChange={handleChange}
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-900">
                Position
              </label>
            </div>
            <select
              type="select"
              id="position"
              name="position"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
              value={form.position}
              onChange={handleChange}
            >
              <option value="GK">GK</option>
              <option value="CB">CB</option>
              <option value="LB">LB</option>
              <option value="RB">RB</option>
              <option value="CDM">CDM</option>
              <option value="CM">CM</option>
              <option value="MCO">MCO</option>
              <option value="RM">RM</option>
              <option value="LM">LM</option>
              <option value="ED">ED</option>
              <option value="EI">EI</option>
              <option value="SD">SD</option>
              <option value="DC">DC</option>
            </select>
          </div>

          <FormField
            labelName="Team"
            type="text"
            name="team"
            placeholder="Barcelona"
            value={form.team}
            handleChange={handleChange}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          {!uploadingImg && (
            <p className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              <input type="file" name="file" />
            </p>
          )}
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
