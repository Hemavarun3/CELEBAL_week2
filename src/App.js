import React, { useState, useEffect } from 'react';
import { LuClipboardEdit } from "react-icons/lu";
import { IoAddCircle } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const App = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState(1);
  const [data, setData] = useState([]);
  const [compdata, setCompdata] = useState([]);
  const [showcomp,setShowcomp]=useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("todoData")) || [];
    setData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

  const handleSubmit = () => {
    if (!text) {
      toast("Add Info");
    } else {
      setData([
        ...data,
        {
          content: text,
          isEdit: false,
          priority: priority
        }
      ]);
      setText("");
    }
  };

  const handleEditSubmit = (index) => {
    const updatedData = data.map((item, idx) =>
      idx === index ? { ...item, isEdit: false } : item
    );
    setData(updatedData);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handlepChange = (e) => {
    setPriority(e.target.value);
  };

  const handleEditChange = (index, e) => {
    const newData = data.map((item, idx) =>
      idx === index ? { ...item, content: e.target.value } : item
    );
    setData(newData);
  };

  const handleDelete = (index) => {
    const deletedTask = data[index];
    const newData = data.filter((_, idx) => idx !== index);
    setData(newData);
    setCompdata([
      ...compdata, deletedTask
    ]);
  };
  

  const handleEdit = (index) => {
    setData(data.map((item, idx) =>
      idx === index ? { ...item, isEdit: true } : item
    ));
  };
  const sort = () => {
    const newData = [...data];
    newData.sort((a, b) => a.priority - b.priority);
    setData(newData);
  };
  const togglecomp = () =>{
    setShowcomp(!showcomp);
    console.log(compdata);
  }

  return (
    <div className='flex flex-col pt-32 items-center'>
      <Toaster />
      <div className='flex flex-col space-y-14 p-2 md:px-48 lg:px-48'>
        <div className='flex items-center justify-center text-purple-500 text-2xl'>
          <h1>TODO LIST</h1>
        </div>
        <div className='flex bg-purple-500 p-4 rounded-2xl justify-between'>
          <input
            name='text'
            type='text'
            value={text}
            id='text'
            onChange={handleChange}
            className='bg-purple-500'
          />
          <select id="prioritySelect" name="priority" value={priority} onChange={handlepChange} className='bg-purple-500'>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            {/* Add more options as needed */}
          </select>
          <button className='text-black px-4 text-2xl' onClick={handleSubmit}>
            <IoAddCircle />
          </button>
        </div>
        <div className='flex space-x-4'>
          <button className='px-4 py-2 rounded-2xl bg-purple-500 hover:cursor-pointer' onClick={sort}>SORT</button>
          <button className='px-4 py-2 rounded-2xl bg-purple-500 hover:cursor-pointer' onClick={togglecomp}>SHOW COMPLETED</button>
        </div>
        <div className='flex flex-col space-y-2'>
          { !showcomp && data.length > 0 && data.map(({ content,priority, isEdit }, index) => (
            !isEdit ? (
              <div key={index} className='flex w-full bg-purple-500 justify-between p-4 rounded-2xl'>
                <p>{content}</p>
                <div className='flex space-x-3'>
                 <h1>{priority}</h1>
                  <button onClick={() => handleEdit(index)}>
                    <LuClipboardEdit />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <IoMdCheckmark />
                  </button>
                </div>
              </div>
            ) : (
              <div key={index} className='flex bg-purple-500 p-4 rounded-2xl justify-between'>
                <input
                  name='text'
                  type='text'
                  value={content}
                  id='text'
                  onChange={(e) => handleEditChange(index, e)}
                  className='bg-purple-500'
                />
                <button className='text-black px-4 text-2xl' onClick={() => handleEditSubmit(index)}>
                  <IoAddCircle />
                </button>
              </div>
            )
          ))}
          { showcomp && compdata.length>0  && compdata.map(({ content,priority, isEdit }, index) => (
              <div key={index} className='flex w-full bg-purple-500 justify-between p-4 rounded-2xl'>
                <p>{content}</p>
                <div className='flex space-x-3'>
                 <h1>{priority}</h1>
                  <button onClick={() => handleEdit(index)}>
                    <LuClipboardEdit />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <IoMdCheckmark />
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
