import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const DeleteBook = () => {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const handleDeleteBook = () => {
    setLoading(true)

    axios
      .delete(`http://localhost:5555/books/${id}`, data)
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
    <div>
      <BackButton />
      <h1>{data.title}</h1>
      <h1>{data.author}</h1>
      <h1>{data.publishYear}</h1>
      <button onClick={handleDeleteBook} className='bg-red-600 p-2 rounded-md'>
        Delete
      </button>
    </div>
  )
}

export default DeleteBook