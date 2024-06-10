import React, { useState } from 'react';
import { LuClipboardEdit } from "react-icons/lu";
import { IoAddCircle } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const App = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [edit,setEdit]=useState(false);
  const [texedit,setTexedit]=useState("");
  const handlesubmit = (e) => {
    // console.log([...data,text]);
    if(!text)
      {
        toast("Add Info");
      }
      else
      {
        setData([
          ...data, text
        ]);
        setText("");
      }
    
  }
  const handlesubmitedit = (e) => {
    // console.log([...data,text]);
    if(!texedit)
      {
        toast("Add updated Info");
      }
      else
      {
        setData([
          ...data, texedit
        ]);
        setTexedit("");
        setEdit(false);
      }
    
  }
  const handlechange = (e) => {
    setText(e.target.value);
  }
  const handlechangeedit = (e) => {
    setTexedit(e.target.value);
  }
  const handledelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const handleedit = (index) => {
    const newData = [...data];
    let val=newData[index];
    newData.splice(index, 1);
    setData(newData);
    setEdit(true);
    setTexedit(val);

  };
  return (
    <div className='flex flex-col pt-32 items-center'>
    <Toaster />
      <div className='flex flex-col space-y-14 p-2 md:px-48 lg:px-48'>
        <div className='flex items-center justify-center text-purple-500 text-2xl'>
           <h1>TODO LIST</h1>
        </div>
        <div className='flex bg-purple-500 p-4 rounded-2xl justify-between'>
          <input name='text' type='text' value={text} id='text' onChange={handlechange} className='bg-purple-500'></input>
          <button className='text-black px-4 text-2xl' onClick={handlesubmit}><IoAddCircle /></button>
        </div>
        {edit && <div className='flex bg-purple-500 p-4 rounded-2xl justify-between'>
          <input name='text' type='text' value={texedit} id='text' onChange={handlechangeedit} className='bg-purple-500'></input>
          <button className='text-black px-4 text-2xl' onClick={handlesubmitedit}><IoAddCircle /></button>
        </div>}
        <div className='flex flex-col space-y-2'>
          {data.length > 0 && data.map((value, index) => (
            <div key={{ index }} className='flex  w-full bg-purple-500 justify-between p-4 rounded-2xl'>
              <p>{value}</p>
              <div className='flex space-x-3'>
                <button onClick={() => handleedit(index)}><LuClipboardEdit /></button>
                <button onClick={() => handledelete(index)}><IoMdCheckmark /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
