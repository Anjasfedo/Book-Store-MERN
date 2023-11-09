import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner';
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books/')
      .then(response => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to={'/books/create'}>
          <MdOutlineAddBox className='text-4xl text-neutral-900'/>
        </Link>
        </div>
        {loading ? (
          <Spinner/>
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
                <th className='border rounded-md border-gray-700'>No</th>
                <th className='border rounded-md border-gray-700'>Title</th>
                <th className='border rounded-md border-gray-700 max-md:hidden'>Author</th>
                <th className='border rounded-md border-gray-700 max-md:hidden'>Publish Year</th>
                <th className='border rounded-md border-gray-700'>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((ele, index) => (
                <tr key={ele._id}>
                  <td className='border rounded-md border-gray-700 text-center'>
                    {index + 1}
                  </td>
                  <td className='border rounded-md border-gray-700 text-center'>
                    {ele.title}
                  </td>
                  <td className='border rounded-md border-gray-700 text-center max-md:hidden'>
                    {ele.author}
                  </td>
                  <td className='border rounded-md border-gray-700 text-center max-md:hidden'>
                    {ele.publishYear}
                  </td>
                  <td className='border rounded-md border-gray-700 text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/detail/${ele._id}`}>
                        <BsInfoCircle className='text-2xl text-green-600' />
                      </Link>
                      <Link to={`/books/edit/${ele._id}`}>
                        <AiOutlineEdit className='text-2xl text-blue-600' />
                      </Link>
                      <Link to={`/books/delete/${ele._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  )
}

export default Home