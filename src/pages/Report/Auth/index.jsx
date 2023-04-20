import React, {useState, useEffect, useMemo} from "react";
import axios from "axios";
import { Button } from 'react-bootstrap'

import "../styles.css";

export const ReportAuth = ({
  newMessage,
  setNewMessage,
  approved,
  setApproved,
}) => {
  // state: type
  const [type, setType] = useState("");

  // state: date
  const [date, setDate] = useState("");

  // state: color
  const [color, setColor] = useState("");

  // state: message
  const [message, setMessage] = useState("");

  // state: officer
  const [officer, setOfficer] = useState("");

  // state: description
  const [description, setDescription] = useState("");

  // state: license number
  const [licenseNumber, setLicenseNumber] = useState("");

  // state: owner full name
  const [ownerFullName, setOwnerFullName] = useState("");

  // state: approved officers
  const approvedOfficers = useMemo(() => {
    return approved.filter((officer) => officer.approved === true)
  }, [approved]);

  // handle: change number
  const handleChangeLicenseNumber = (e) => setLicenseNumber(e.target.value);

  // handle: change owner full name
  const handleChangeOwnerFullName = (e) => setOwnerFullName(e.target.value);

  // handle: change number
  const handleChangeColor = (e) => setColor(e.target.value);

  // handle: change date
  const handleChangeDate = (e) => setDate(e.target.value);

  // handle: change description
  const handleChangeDescription = (e) => setDescription(e.target.value);

  // handle: change type
  const handleChangeType = (e) => setType(e.target.value);

  // handle: change officer
  const handleChangeOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = approved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };

  useEffect(() => {
    setOfficer(officer);
  }, [officer]);

  useEffect(() => {
    setType(type);
  }, [type]);
  
  useEffect(() => {
    allWorkers();
  }, [newMessage]);

  const allWorkers = async () => {
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/officers/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setApproved(result.data.officers);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/cases/",
        {
          licenseNumber,
          ownerFullName,
          color,
          date,
          description,
          type,
          officer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="modalForm" method="post" onSubmit={handleSubmit}>
      <h2>Сообщить о краже</h2>
      <p>{message}</p>
      <div className="modalSubContainer">
        <span onClick={() => setNewMessage(!newMessage)}>X</span>

        <div>
          <label>Ответственный сотрудник </label>
          <select onChange={handleChangeOfficer} value={officer}>
            <option>Выберите сотрудника</option>
            {approvedOfficers.map((officer) => (
              <option key={officer._id} value={officer._id}>
                {officer.firstName} {officer.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Номер лицензии</label>
          <input
            onChange={handleChangeLicenseNumber}
            value={licenseNumber}
            type="text"
            required
          />
          <label>ФИО клиента</label>
          <input
            onChange={handleChangeOwnerFullName}
            value={ownerFullName}
            type="text"
            required
          />
        </div>
        <div>
          <label>Цвет велосипеда </label>
          <input onChange={handleChangeColor} value={color} type="text" />
          <label>Дата кражи</label>
          <input onChange={handleChangeDate} value={date} type="date" />
        </div>
        <div>
          <label>Дополнительная информация</label>
          <input onChange={handleChangeDescription} value={description} type="text" />
          <label>Тип велосипеда </label>
          <select onChange={handleChangeType} value={type} required>
            <option value="">Выберите тип велосипеда</option>
            <option value="general">general</option>
            <option value="sport">sport</option>
          </select>
        </div>
        <Button variant={'primary'} type="submit">Отправить</Button>
      </div>
    </form>
  );
};
