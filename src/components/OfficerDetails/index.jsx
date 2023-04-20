import React, {useMemo, useState} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

import "./styles.css";

export const OfficerDetails = ({ detail, setDetail, info, getOfficers }) => {
  const { id } = useParams();

  // state: officer
  const officer = useMemo(() => {
    return info.find(({ _id }) => _id === id);
  }, [info])

  // state: password
  const [password, setPassword] = useState("");

  // state: edit mode
  const [editMode, setEditMode] = useState(false);
  
  // state: last name
  const [lastName, setLastName] = useState(officer.lastName);

  // state: approved
  const [approved, setApproved] = useState(officer.approved);

  // state: first name
  const [firstName, setFirstName] = useState(officer.firstName);

  // handle: edit
  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);

    axios
      .put(
        `https://skillfactory-final-project.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          approved: approved,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        getOfficers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle: delete
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://skillfactory-final-project.herokuapp.com/api/officers/${officer._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        getOfficers();
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="details">
      <div className="businessCard">
        <div className="detailContainer">
          <div>
            <Link to={`/officers/`}>
              <span className="link" onClick={() => setDetail(!detail)}>
                X
              </span>
            </Link>

            <form className="surname">
              <label htmlFor="">Имя:</label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!editMode}
                type="text"
                value={firstName}
              />
              <label htmlFor="">Фамилия:</label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastName}
                disabled={!editMode}
              />
              <label>Эл.почта:</label>
              <input type="text" value={officer.email} disabled />
              <label>Пароль:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                disabled
              />
              <label>Идент.номер:</label>
              <input type="text" value={officer._id} disabled />
              <div className="approved">
                <input
                  type="checkbox"
                  value={approved}
                  disabled={!editMode}
                  checked={approved}
                  onChange={() => setApproved(!approved)}
                />
                <label>Одобрен</label>
              </div>
              <div className="butts">
                {(!editMode && (
                  <Button variant={'primary'} onClick={handleEdit}>
                    Редактировать
                  </Button>
                )) || (
                  <Button variant={'success'} onClick={handleSubmit}>
                    Сохранить
                  </Button>
                )}
                <Button variant={'danger'} onClick={handleDelete}>
                  Удалить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
