import React, { useState } from 'react'
import { final_be } from '../../../../declarations/final_be'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const [size, setSize] = useState('large')

  const hello = async () => {
    const res = await final_be.hello()
    console.log(res)
  }

  hello()
  return (
    <div>
      <h1> Home page</h1>
      <button onClick={() => navigate('/education-kyc')}>click</button>
    </div>
  )
}

export default Home
