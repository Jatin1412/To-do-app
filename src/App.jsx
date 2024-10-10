import React, {useState} from "react";
import "./App.css";

const App = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
    };

    // Send data to the backend
    try {
      const response = await fetch('http://localhost:5000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTitle('')
        setDescription('')
        const html = `<h1>${data.task.title}</h1>
        <h4>${data.task.description}</h4>`
        document.querySelector(".to-do").insertAdjacentHTML('afterbegin', html);
      } else {
        alert('Error: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" value={title}
          onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter Title" />
        <label htmlFor="task">Task</label>
        <input type="text" value={description}
          onChange={(e) => setDescription(e.target.value)} id="task" placeholder="Enter Task" />
        <button type="submit" id="btn">Task Add</button>
      </form>
      <div className="to-do"></div>
      
    </>
  );
};

export default App;
