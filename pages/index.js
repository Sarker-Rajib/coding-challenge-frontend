import { toast, Toaster } from "react-hot-toast";
import Map from "../Component/Map";
import { useDispatch } from 'react-redux';
import { locate } from '../slices/locationSlice';
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return { props: { data } }
}

const Home = ({ data }) => {
  const dispatch = useDispatch();
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const body = form.body.value;
    const userId = form.userId.value;

    console.log(userId);

    if (title.length < 0 || body.length < 0 || userId < 0) {
      return;
    }

    const usedata = {
      title,
      body,
      userId
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content": "application/json",
      },
      body: JSON.stringify(usedata)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)

        if (data.id) {
          toast.success('Data Successfully Submitted');
          form.reset();
        }
      })

  };

  const handleChange = async (value) => {
    if (value > 0) {
      const url = `https://jsonplaceholder.typicode.com/users/${value}`
      const res = await fetch(url);
      const data = await res.json();

      const geo = data.address.geo;
      console.log(geo);
      dispatch(locate(geo))
      setUserError('')
    }
    else {
      setUserError("Please select a user")
    }
  }

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-gray-500 mt-8 rounded-xl text-white">
        <div className="title mb-4">
          <h1 className='text-center text-2xl'>ad-my-brand (form control - task)</h1>
        </div>
        <div>
          <div className="mb-4 rounded overflow-hidden">
            <Map></Map>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title">User <span className="text-red-400">{userError}</span></label>
              <select onChange={(e) => handleChange(e.target.value)} name="userId" type="text" className='w-full text-cyan-600 rounded  p-2' required>
                <option value="0">-- Please select --</option>
                {
                  data?.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title">Title <span className="text-red-400">{titleError}</span></label>
              <input
                onChange={(e) => {
                  const title = e.target.value;
                  if (title.length > 0) {
                    // console.log(title);
                    setTitleError('')
                  }
                  else {
                    setTitleError('Please input a title')
                  }
                }}
                name="title"
                type="text"
                className='input w-full text-cyan-600 rounded  p-2'
                required />
            </div>
            <div className="mb-4">
              <label htmlFor="body">Body <span className="text-red-400">{bodyError}</span></label>
              <input
                onChange={(e) => {
                  const body = e.target.value;
                  if (body.length > 0) {
                    // console.log(body);
                    setBodyError('')
                  }
                  else {
                    setBodyError('Please input text for body')
                  }
                }}
                name="body" type="text" className='input w-full text-cyan-600 rounded  p-2' required />
            </div>
            <div className="mb-3">
              <button type="submit" className='btn w-full bg-orange-300 rounded p-2 mt-4 cursor-pointer'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default Home;