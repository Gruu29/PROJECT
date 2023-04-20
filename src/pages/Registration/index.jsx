import React, { useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap'

import "../Report/styles.css";

import signup from "../../assets/images/signup.jpg";

export const Registration = () => {
  // state: email
  const [email, setEmail] = useState("");

  // state: message
  const [message, setMessage] = useState("");

  // state: last name
  const [lastName, setLastName] = useState("");

  // state: client id
  const [clientId, setClientId] = useState("");

  // state: password
  const [password, setPassword] = useState("");

  // state: first name
  const [firstName, setFirstName] = useState("");

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "b0c95434-4afe-4ff5-9cda-4c8b4d1a5586") {
      setMessage("Введите валидный Id Client");
    }
    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/auth/sign_up",
        { email, password, firstName, lastName, clientId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setClientId("");
          setMessage("Поздравлем! Вы зарегистрированы!");
          console.log(response);
        },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      )
      .catch((error) => {
        console.log(error)
        setMessage('Упс! Что-то пошло не так :(');
      });
  };

  // handle: change email
  const handleChangeEmail = (e) => setEmail(e.target.value);

  // handle: change password
  const handleChangePassword = (e) => setPassword(e.target.value);

  // handle: change first name
  const handleChangeFirstName = (e) => setFirstName(e.target.value);

  // handle: change last name
  const handleChangeLastName = (e) => setLastName(e.target.value);

  // handle: change client id
  const handleChangeClientId = (e) => setClientId(e.target.value);

  return (
    <div className="report">
      <img src={signup} alt="thief" />
      <form className="formPublic" method="post" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <label>
          E-mail* <br />
          <input
            onChange={handleChangeEmail}
            type="text"
            name="email"
            value={email}
            required
          />
        </label>
        <label>
          Пароль* <br />
          <input
            onChange={handleChangePassword}
            type="password"
            name="пароль"
            value={password}
            required
          />
        </label>
        <label>
          Имя <br />{" "}
          <input
            onChange={handleChangeFirstName}
            type="text"
            name="имя"
            value={firstName}
          />
        </label>
        <label>
          Фамилия <br />
          <input
            onChange={handleChangeLastName}
            type="text"
            name="фамилия"
            value={lastName}
          />
        </label>
        <label>
          Client ID* <br />{" "}
          <input
            onChange={handleChangeClientId}
            type="text"
            name="client id"
            value={clientId}
            required
          />
        </label>
        <Button style={{ width: "200px", marginTop: "15px" }}>
          Зарегистрироваться
        </Button>
        <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
      </form>
    </div>
  );
};
