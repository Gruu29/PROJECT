import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";


// Components
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

// Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Report } from "./pages/Report";
import { Messages } from "./pages/Messages";
import { Officers } from "./pages/Officers";
import { Registration } from "./pages/Registration";

// Styles
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // state: data
  const [data, setData] = useState([]);

  // state: email
  const [email, setEmail] = useState("");

  // state: message
  const [message, setMessage] = useState("");

  // state: password
  const [password, setPassword] = useState("");

  // state: approved
  const [approved, setApproved] = useState([]);

  // state: loading
  const [loading, setLoading] = useState(false);

  // state: admin
  const [admin, setAdmin] = useState(
    localStorage.getItem(localStorage.getItem("admin") || false)
  );

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/auth/sign_in",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )

      .then((response) => {
        setLoading(false);
        setData(response.data);
        localStorage.setItem("token", response.data.data.token);
        console.log(response);
        if (response.data.data.user.approved === true) {
          setAdmin(!admin);
          localStorage.setItem("admin", true);
        }
        setMessage("");
      })
      .catch((error) => {
        setMessage("Вы ввели неверный логин или пароль");
      });
  };

  return (
    <div className="App">
      <Router>
        <Header admin={admin} setAdmin={setAdmin} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="auth/registration" element={<Registration/>}/>
          <Route
            path="auth/login"
            element={
              <Login
                  admin={admin}
                  setAdmin={setAdmin}
                  data={data}
                  setData={setData}
                  password={password}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  message={message}
                  email={email}
                  handleSubmit={handleSubmit}
                  loading={loading}
              />
            }
          />
          <Route
            path="public/report"
            element={<Report admin={admin}/>}
          />
          <Route
            path="/officers"
            element={
              <Officers approved={approved} setApproved={setApproved}/>
            }
          />
          <Route
            path="/cases/"
            element={<Messages approved={approved} setApproved={setApproved}/>}
          />
          <Route
            path="/officers/:id"
            element={
              <Officers approved={approved} setApproved={setApproved}/>
            }
          />
          <Route
            path="/cases/:id"
            element={<Messages approved={approved} setApproved={setApproved}/>}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
