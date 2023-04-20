import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap';

import { OfficerDetails } from "../../components/OfficerDetails";

import "./styles.css";

import staff from "../../assets/images/officers.svg";

export const Officers = ({ setApproved }) => {
  // state: password
  const [password, setPassword] = useState();

  // state: info
  const [info, setInfo] = useState([]);

  // state: email
  const [email, setEmail] = useState("");

  // state: first name
  const [firstName, setFirstName] = useState("");

  // state: message
  const [message, setMessage] = useState("");

  // state: detail
  const [detail, setDetail] = useState(false);

  // state: last name
  const [lastName, setLastName] = useState("");

  // state: loading
  const [loading, setLoading] = useState(false);

  // state: newWorker
  const [newWorker, setNewWorker] = useState(false);

  // method: get all workers
  const getOfficers = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).finally(() => setLoading(false));
    setInfo(result.data.officers);
    setApproved(result.data.officers);
  };

  useEffect(() => {
    getOfficers();
  }, [newWorker]);

  // handle: change email
  const handleChangeEmail = (e) => setEmail(e.target.value);

  // handle: change password
  const handleChangePassword = (e) => setPassword(e.target.value);

  // handle change first name
  const handleChangeFirstName = (e) => setFirstName(e.target.value);

  // handle: change last name
  const handleChangeLastName = (e) => setLastName(e.target.value);

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/officers",
        { email, password, firstName, lastName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setFirstName("");
        setPassword("");
        setEmail("");
        setLastName("");
        setMessage("Новый сотрудник успешно зарегистрирован");
        getOfficers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle: add
  const handleAdd = () => {
    setNewWorker(!newWorker);
  };

  // handle: close
  const handleClose = () => {
    setNewWorker(!newWorker);
    setMessage("");
  };

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h2 className="title">Список всех зарегистрированных сотрудников</h2>
      <div className="officerContainer">
        <ol className="officers">
          {loading ? <div className="loading">loading...</div> :
            info.map((worker) => (
              <div key={worker._id} className="approve">
                <Link
                  onClick={() => setDetail(!detail)}
                  className="link"
                  to={`/officers/${worker._id}`}
                >
                  <li>{worker.email}</li>
                </Link>
              </div>
            ))}
        </ol>
        {(info.length === 0 && <div/>) || (
          <Button onClick={handleAdd}>
            Добавить сотрудника
          </Button>
        )}
        {(newWorker && (
          <form method="post" className="addOfficer" onSubmit={handleSubmit}>
            <div className="relat">
              <span
                style={{
                  color: "var(--bs-white)",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                {message}
              </span>
              <label>E-mail </label>
              <input
                onChange={handleChangeEmail}
                type="text"
                name="email"
                value={email}
                required
              />

              <label>Пароль</label>
              <input
                onChange={handleChangePassword}
                type="password"
                name="пароль"
                value={password}
                required
              />

              <label>Имя</label>
              <input
                onChange={handleChangeFirstName}
                type="text"
                name="имя"
                value={firstName}
              />

              <label>Фамилия</label>
              <input
                onChange={handleChangeLastName}
                type="text"
                name="фамилия"
                value={lastName}
              />
              <span onClick={handleClose} className="close">
                X
              </span>
              <Button variant={'success'}>Добавить</Button>
            </div>
          </form>
        )) ||
          (detail && (
            <OfficerDetails
              info={info}
              detail={detail}
              setDetail={setDetail}
              getOfficers={getOfficers}
            />
          )) ||
          null}
      </div>
    </div>
  );
};
