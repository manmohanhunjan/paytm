import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Card from './components/Card'

function App() {
  const [data, setData] = useState('')
  useEffect(() => {
    axios.get('https://randomuser.me/api/?page=1&results=1&seed=abc')
    .then((response) => {
      setData(response.data)
    })
  }, [])


  return (
    <div
    className='grid place-items-center
    h-screen
    bg-gray-200

    '
    >
        {data !== '' ? <Card fName={data.results[0].name.first}
        lName={data.results[0].name.last}
        imageSrc={data.results[0].picture.large}
        gender={data.results[0].gender}
        phNumber={data.results[0].phone}
        /> : 'Loading...' }

    </div>
  )
}

export default App
