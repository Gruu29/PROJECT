import React from "react";
import { Button } from 'react-bootstrap'

import { Home } from "../Home";

import "../Report/styles.css";

import signin from "../../assets/images/signin.jpg";

export const Login = ({
  admin,
  email,
  loading,
  message,
  password,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  return (
    <>
      {(loading && (
        <div className="loading" style={{ alignSelf: "center" }}>
          loading...
        </div>
      )) ||
        (!admin && (
          <div style={{ marginTop: "90px" }} className="report">
            <img src={signin} alt="thief" />
            <form className="formPublic" onSubmit={handleSubmit}>
              <h2>Авторизация</h2>
              <label>E-mail</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                required
              />
              <label>Пароль</label>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button style={{ margin: "30px 0 20px 0" }} className="register">
                Войти
              </Button>

              <p>{message}</p>
            </form>
          </div>
        )) || <Home />}
    </>
  );
};
