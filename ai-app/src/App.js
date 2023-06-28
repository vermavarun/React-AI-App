// https://create-react-app.dev/docs/getting-started
// https://stackabuse.com/get-http-request-in-react/
// https://blog.logrocket.com/using-react-toastify-style-toast-messages/
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  function playvideo() {
    const vp = document.getElementById("videoplayer");
    vp.play();
  }
  useEffect(()=> {

    const vp = document.getElementById("videoplayer");
    axios
      .get("http://localhost:5200/video", {responseType: 'blob' })
      .then((response) => {
        var blob = new Blob([response.data])
        vp.src = URL.createObjectURL(blob);
      })
      .catch((err) => {
        console.log(err);
      });

  },[]);

  // const [message, setMessage] = useState([]);
  // useEffect(() => {
  //   GetEmployees();
  // }, []);

  // function GetEmployees() {
  //   axios
  //     .get("http://localhost:5200")
  //     .then((response) => {
  //       var result = response.data.map(x=>x.employeeName).join(", ")
  //       setMessage(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.empName.value);
  //   axios
  //     .post("http://localhost:5200?employeeName=" + event.target.empName.value)
  //     .then((response) => {
  //       //setMessage("Emp Added with id: " + response.data);
  //       //GetEmployees();
  //       event.target.empName.value="";
  //       showToastMessage();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    var div = document.getElementById('chat-box');
    div.innerHTML += "<div class='you-r'> You: " + event.target.prompt.value + "</div>";

    axios
      .post("http://localhost:5200/openai?prompt=" + event.target.prompt.value)
      .then((response) => {
        //setMessage("Emp Added with id: " + response.data);
        //GetEmployees();
        div.innerHTML += "<div class='ai-r'> AI: " + response.data + "</div>";
        event.target.prompt.value = "";
        div.scrollTop = div.scrollHeight;
      })
      .catch((err) => {
        console.log(err);
      });


  };



  // const showToastMessage = () => {
  //   toast.success('Success Notification !', {
  //       position: toast.POSITION.TOP_RIGHT
  //   });
  // };

  return (
    <div className="App">
      {/* <div className="sidenav">{message}</div> */}
      <div className="main">
        <div className="chatbox" id="chat-box"></div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <textarea name="prompt" placeholder="Ask me anything"></textarea>
            </div>
            <div>
              <input type="submit" value="Go" />
            </div>
          </form>
        </div>
      </div>
      {/* https://img.ly/blog/how-to-stream-videos-using-javascript-and-html5/ */}
      <div className="videomain">
        <video  id="videoplayer" width="500px" height="300px"  onContextMenu={e => e.preventDefault()}>

        </video>
        <button onClick={playvideo}>Play</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
