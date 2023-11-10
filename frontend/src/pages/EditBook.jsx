import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const EditBook = () => {

  const { id } = useParams();

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setData(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
      })
  }, []);

  const changeData = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const handleEditBook = () => {
    setLoading(true)

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('There is an error, check console please')
        console.log(error)
      })
  }

  return (
<div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (
        <Spinner />
      ) : ''}
      <div className='flex flex-col border-2 border-blue-800 rounded-xl p-4 w-[600px] mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700' >Title</label>
          <input 
            name='title'
            type="text" 
            value={data.title}
            onChange={changeData}
            className='border-2 border-gray-900 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700' >Author</label>
          <input 
            name='author'
            type="text" 
            value={data.author}
            onChange={changeData}
            className='border-2 border-gray-900 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700' >PublishYear</label>
          <input 
            name='publishYear'
            type="number" 
            value={data.publishYear}
            onChange={changeData}
            className='border-2 border-gray-900 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-600 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook