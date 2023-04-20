import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import "./styles.css";

import thief from "../../assets/images/thief.jpg";

export const Report = () => {
  // state: date
  const [date, setDate] = useState("");

  // state: type
  const [type, setType] = useState("");

  // state: color
  const [color, setColor] = useState("");

  // state: message
  const [message, setMessage] = useState("");

  // state: description
  const [description, setDescription] = useState("");

  // state: license number
  const [licenseNumber, setLicenseNumber] = useState("");

  // state: owner full name
  const [ownerFullName, setOwnerFullName] = useState("");

  // handle: change number
  const handleChangeLicenseNumber = (e) => setLicenseNumber(e.target.value);

  // handle: change name
  const handleChangeOwnerFullName = (e) => setOwnerFullName(e.target.value);

  // handle: change color
  const handleChangeColor = (e) => setColor(e.target.value);

  // handle: change date
  const handleChangeDate = (e) => setDate(e.target.value);

  // handle: change description
  const handleChangeDescription = (e) => setDescription(e.target.value);

  // handle: change type
  const handleChangeType = (e) => setType(e.target.value);

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/public/report",
        {
          ownerFullName: ownerFullName,
          licenseNumber: licenseNumber,
          type: type,
          clientId: "34454c60-82d6-4062-8933-0a2e7391d4fd",
          color: color,
          date: date,
          description: description,
        }
      )
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setMessage("Заявка отправлена");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="report">
        <img src={thief} alt="thief" />
        <form className="formPublic" method="post" onSubmit={handleSubmit}>
          <p>{message}</p>
          <h2>Сообщить о краже</h2>
          <label>Номер лицензии* </label>
          <input
            onChange={handleChangeLicenseNumber}
            value={licenseNumber}
            type="text"
            required
          />
          <label>ФИО клиента* </label>
          <input
            onChange={handleChangeOwnerFullName}
            value={ownerFullName}
            type="text"
            required
          />
          <label>Цвет велосипеда </label>
          <input onChange={handleChangeColor} value={color} type="text" />
          <label>Дата кражи</label>
          <input onChange={handleChangeDate} value={date} type="date" />
          <label>Дополнительная информация</label>
          <input onChange={handleChangeDescription} value={description} type="text" />
          <label>Тип велосипеда*</label>
          <select onChange={handleChangeType} value={type} required>
            <option value="">Выберите тип велосипеда</option>
            <option value="general">general</option>
            <option value="sport">sport</option>
          </select>
          <Button variant={'primary'}>Отправить</Button>
        </form>
      </div>
    </>
  );
};
