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

  return (
    <div className="App">
      <header className="App-header">
      Message from Api:: {message}
      </header>
    </div>
  );
}

export default App;
