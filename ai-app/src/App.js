// https://create-react-app.dev/docs/getting-started
// https://stackabuse.com/get-http-request-in-react/
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    axios
       .get('http://localhost:5200')
       .then((response) => {
         setMessage(response.data);
       })
       .catch((err) => {
          console.log(err);
       });
  }, []);

  const handleSubmit =(event) => {
    event.preventDefault();
    console.log(event.target.empName.value);
    axios
       .post('http://localhost:5200?employeeName='+event.target.empName.value)
       .then((response) => {
         setMessage("Emp Added with id: " + response.data);
       })
       .catch((err) => {
          console.log(err);
       });

  }

  return (
    <div className="App">
      <header className="App-header">
      Message from Api:: {message}
      <br/>
      <br/>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter Name </label>
          <input type='text' name="empName"></input>
          <input type='submit'/>
        </form>
      </div>
      </header>


    </div>
  );
}

export default App;
