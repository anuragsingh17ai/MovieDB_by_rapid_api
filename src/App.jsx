import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [endpoint,setEndpoint]=useState('game of thr');
  const [container,setContainer]=useState([]);
  

  const fetch=()=>{
    const options = 
    {
      method: 'GET',
      url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
      params: {q: endpoint},
      headers: {
        'X-RapidAPI-Key': 'e6aadd974emsh93408ae922b18cdp1a9960jsn79e5d6dd06e4',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };
    axios.request(options)
    .then(function (response) {setContainer(response.data.d); console.log(response.data.d);})
    .catch(function (error) {console.error(error)});
  }

  const mount=useRef(true);
  useEffect(()=>{
    if(mount.current===true)
    {
      fetch();
    }
      mount.current=false;
  }
,[]);



  const onChangeHandler=(e)=>{
    setEndpoint(e.target.value);
  }

  const submitHandler=e=>{
    e.preventDefault();
  }

  return (
    <div className='bg-black '  >
    <h1 className='text-yellow-500 font-bold text-6xl p-2 '> MovieDB</h1>
      <div className='flex justify-center mt-5 mb-2  '>
        <div >
            <form onSubmit={submitHandler} >
              <input type='search' placeholder='enter movie name' onChange={onChangeHandler} className=' rounded-md md:p-5  mr-2 w-60 md:w-96  md:h-10 shadow-md focus:outline-none hover:shadow-yellow-200' />
              <button type='submit' onClick={fetch} className='bg-yellow-500 bg-slate-300 rounded-md md:h-10 md:w-20'>Search</button>
            </form>
          </div>
      </div>

      <div className='grid md:grid-cols-4 '>  
        {container.map((value)=>{
            return (
              <div className='ml-4 mr-4 mt-4'>
                <div>
                  { 'i' in value && <img src={value.i.imageUrl} alt={value.l} className='h-96 w-96 rounded-lg hover:shadow-lg hover:shadow-yellow-200 shadow-md shadow-gray-300'  />}
                  {!('i' in value) && <img src='https://static.vecteezy.com/system/resources/previews/001/826/301/original/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg' alt='' className='h-96 w-96' />}
                </div>
                <div  className='text-white'> 
                  <p >{value.l} </p> 
                  <p className='text-gray-400'>{value.qid}</p>
                  <p className='text-gray-400'>IMDB Rank: {value.rank}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
