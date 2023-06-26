// https://create-react-app.dev/docs/getting-started
// https://stackabuse.com/get-http-request-in-react/
// https://blog.logrocket.com/using-react-toastify-style-toast-messages/
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    GetEmployees();
  }, []);

  function GetEmployees() {
    axios
      .get("http://localhost:5200")
      .then((response) => {
        setMessage(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.empName.value);
    axios
      .post("http://localhost:5200?employeeName=" + event.target.empName.value)
      .then((response) => {
        //setMessage("Emp Added with id: " + response.data);
        GetEmployees();
        event.target.empName.value="";
        showToastMessage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="App">
      <div className="sidenav">{message}</div>
      <div className="main">
        <div>
          <form onSubmit={handleSubmit}>
            <label>Enter Name </label>
            <input type="text" name="empName"></input>
            <input type="submit" />

          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
