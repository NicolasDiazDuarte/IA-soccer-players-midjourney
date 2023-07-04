import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { preview } from '../assets'
import { Loader } from '../components'
import * as Yup from 'yup'

const CreatePost = () => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const [nftID, setNftID] = useState('')

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [uploadData, setUploadData] = useState(null)

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 9999999) + 1
    const paddedNum = randomNum.toString().padStart(7, '0')
    setNftID(paddedNum)
  }, [])

  function handleupload(changeEvent, formik) {
    const reader = new FileReader()
    if (changeEvent?.target.files !== null) {
      reader.onload = function (onLoadEvent) {
        formik.setFieldValue('photo', onLoadEvent.target.result)
        setUploadData(true)
      }
      reader.readAsDataURL(changeEvent?.target?.files[0])
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
      <Formik
        initialValues={{
          nftID: (Math.floor(Math.random() * 9999999) + 1).toString().padStart(7, '0'),
          name: '',
          version: '',
          age: '',
          rating: '',
          position: 'GK',
          team: '',
          photo: '',
        }}
        innerRef={ref}
        validationSchema={Yup.object({
          nftID: Yup.string()
            .min(7, 'ID has to be with 7 characters')
            .max(7, 'ID has to be with 7 characters')
            .required('Required'),
          name: Yup.string().required('Required'),
          version: Yup.number()
            .moreThan(1900, 'Must be an age more than 1900')
            .lessThan(2100, 'Must be an age less than 2100')
            .required('Required'),
          team: Yup.string().required('Required'),
          rating: Yup.number().lessThan(100, 'Must be a number between 1-99').required('Required'),
          age: Yup.number().lessThan(80, 'Must be a valid age').required('Required'),
        })}
        onSubmit={async (values, e) => {
          if (values.nftID && values.name && values.photo) {
            setLoading(true)
            try {
              const response = await fetch('https://soccer-players-api.onrender.com/api/v1/post', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...values }),
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
        }}
      >
        {(formik) => {
          return (
            <>
              <Form className="mt-10 max-w-7xl relative">
                <div className="flex flex-wrap gap-5 space-between">
                  <div className="w-1/2 flex flex-wrap gap-4">
                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Soccer card ID</label>
                      </div>
                      <Field
                        disabled
                        type="text"
                        name="nftID"
                        placeholder="Ex. 0000001"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300"
                        // handleChange={handleChange}
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="nftID"></ErrorMessage>
                    </div>

                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Player full name</label>
                      </div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Ex Lionel Messi"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="name"></ErrorMessage>
                    </div>

                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Version</label>
                      </div>
                      <Field
                        type="Number"
                        name="version"
                        placeholder="2012"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="version"></ErrorMessage>
                    </div>

                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Team</label>
                      </div>
                      <Field
                        type="text"
                        name="team"
                        placeholder="Barcelona"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="team"></ErrorMessage>
                    </div>

                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Rating</label>
                      </div>
                      <Field
                        type="Number"
                        name="rating"
                        placeholder="81"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="rating"></ErrorMessage>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Position</label>
                      </div>
                      <Field
                        as="select"
                        id="position"
                        name="position"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                        // value={form.position}
                        // onChange={handleChange}
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
                      </Field>
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="position"></ErrorMessage>
                    </div>
                    <div className="w-1/3">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Age</label>
                      </div>
                      <Field
                        type="Number"
                        name="age"
                        placeholder="18"
                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
                      />
                      <ErrorMessage component="label" className="text-red-500 text-sm" name="age"></ErrorMessage>
                    </div>
                  </div>
                  <div className="w-5/12 ">
                    <div className="relative left-[30%] mt-6 mr-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-44 p-3 h-44 flex justify-center items-center">
                      {uploadData ? (
                        <img
                          src={formik.values?.photo}
                          alt={formik.values?.name}
                          className="absolute w-full h-full object-contain"
                        />
                      ) : (
                        <img src={preview} alt="preview" className="absolute w-9/12 h-9/12 object-contain opacity-40" />
                      )}

                      {generatingImg && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                          <Loader />
                        </div>
                      )}
                    </div>
                    <div className="m-auto mt-2 gap-5 w-max">
                      {!uploadingImg && (
                        <p className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                          <input type="file" name="file" onChange={(e) => handleupload(e, formik)} />
                        </p>
                      )}
                    </div>
                  </div>
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
              </Form>
            </>
          )
        }}
      </Formik>
    </section>
  )
}

export default CreatePost
