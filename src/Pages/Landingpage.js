import React from 'react'
import { useNavigate } from "react-router-dom"
import metavid from "./landing.mp4"

const Landingpage = () => {
  const navigate = useNavigate()
  const Enter = () => {
    navigate("/verse")

  }

  return (
    <>
      <div className="video-container">
        <video src={metavid} className="video-bg" autoPlay loop muted>
          {/* Optionally, you can include text or fallback content here */}
          Your browser does not support the video tag.
        </video>
        <div className="content">

          <button className='bg-blue-500 text-white px-9 rounded-full text-lg' onClick={Enter} >Enter  </button>
        </div>
      </div>
    </>
  )
}

export default Landingpage