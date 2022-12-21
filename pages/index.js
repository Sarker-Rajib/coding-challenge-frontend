import { toast, Toaster } from "react-hot-toast";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return { props: { data } }
}

export default function Home({ data }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Data Successfully Submitted');
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-gray-500 mt-8 rounded-xl text-white">
        <div className="title mb-4">
          <h1 className='text-center text-2xl'>ad-my-brand (form control - task)</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title">User</label>
              <select name="title" type="text" className='w-full text-cyan-600 rounded  p-2' required>
                <option value="0">Please select below</option>
                {
                  data?.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                }
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input name="title" type="text" className='input w-full text-cyan-600 rounded  p-2' required />
            </div>
            <div className="mb-4">
              <label htmlFor="body">Body</label>
              <input name="body" type="text" className='input w-full text-cyan-600 rounded  p-2' required />
            </div>

            <div className="mb-3">
              <input type="submit" value="Submit" className='btn w-full bg-orange-300 rounded p-2 mt-4 cursor-pointer' />
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  )
}