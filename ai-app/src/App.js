// https://create-react-app.dev/docs/getting-started
// https://stackabuse.com/get-http-request-in-react/
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
      })
      .catch((err) => {
        console.log(err);
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
    </div>
  );
}

export default App;
