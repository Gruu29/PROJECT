import React, {useState, useEffect, useMemo} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export const ReportDetails = ({
  cases,
  setDetail,
  detail,
  approved,
  setApproved,
}) => {
  const { id } = useParams();

  // state: report
  const report = useMemo(() => cases.find(({ _id }) => _id === id), [cases]);

  // state: type
  const [type, setType] = useState(report.type);

  // state: date
  const [date, setDate] = useState(report.date);

  // state: color
  const [color, setColor] = useState(report.color);

  // state: status
  const [status, setStatus] = useState(report.status);

  // state: officer
  const [officer, setOfficer] = useState(report.officer);

  // state: edit mode
  const [editMode, setEditMode] = useState(false);

  // state: resolution
  const [resolution, setResolution] = useState(report.resolution);

  // state: description
  const [description, setDescription] = useState(report.description);

  // state: owner full name
  const [ownerFullName, setOwnerFullName] = useState(report.ownerFullName);

  // state: license number
  const [licenseNumber, setLicenseNumber] = useState(report.licenseNumber);

  // state: approved officers
  const approvedOfficers = useMemo(() => {
    return approved.filter((officer) => officer.approved === true)
  }, [approved]);

  const getWorkers = async () => {
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

  useEffect(() => {
    getWorkers();
  }, [editMode]);

  // handle: change officer
  const handleChangeOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = approved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };

  // handle: submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);

    axios
      .put(
        `https://skillfactory-final-project.herokuapp.com/api/cases/${report._id}`,
        {
          status,
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description,
          officer,
          resolution,
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
        `https://skillfactory-final-project.herokuapp.com/api/cases/${report._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modalDetail">
      <div className="modalContainer">
        <h3>Детали кражи</h3>

        <Link to={`/cases/`}>
          <span onClick={() => setDetail(!detail)}>X</span>
        </Link>

        <div>
          <label>
            Номер заявки <br />
            <input type="text" value={report._id} disabled />
          </label>
          <label>
            Цвет
            <br />
            <input
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              disabled={!editMode}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
            />
          </label>
          <label>
            Создано
            <br />
            <input type="text" value={report.createdAt} disabled />
          </label>
          <label>
            Дата кражи
            <br />
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            />
          </label>
        </div>
        <div>
          <label>
            Описание
            <br />
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            />
          </label>
          <label>
            Номер велосипеда
            <br />
            <input
              type="text"
              onChange={(e) => setLicenseNumber(e.target.value)}
              value={licenseNumber}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            />
          </label>
          <label>
            Сотрудник
            <br />
            <select
              value={officer}
              onChange={handleChangeOfficer}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            >
              <option value="">{officer}</option>
              {approvedOfficers.map((officer) => (
                <option key={officer._id} value={officer._id}>
                  {officer.firstName} {officer.lastName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Имя владельца
            <br />
            <input
              type="text"
              onChange={(e) => setOwnerFullName(e.target.value)}
              value={ownerFullName}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            />
          </label>
        </div>
        <div>
          {status === "done" && (
            <label>
              Решение
              <br />
              <input
                onChange={(e) => setResolution(e.target.value)}
                type="text"
                value={resolution}
                style={{
                  color: editMode && "var(--bs-black)",
                  backgroundColor: editMode && "var(--bs-white)",
                }}
                disabled={!editMode}
                required
              />
            </label>
          )}

          <label>
            Статус
            <br />
            <select
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={"default"}
              value={status}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            >
              <option value="new">new</option>

              <option value="in_progress">in_progress</option>
              <option value="done">done</option>
            </select>
          </label>
          <label>
            Тип
            <br />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                color: editMode && "var(--bs-black)",
                backgroundColor: editMode && "var(--bs-white)",
              }}
              disabled={!editMode}
            >
              <option value="sport">sport</option>
              <option value="general">general</option>
            </select>
          </label>
          <label>
            Обновлено
            <br />
            <input type="text" value={report.updatedAt} disabled />
          </label>
        </div>
        <div className="buttons">
          {(!editMode && (
              <Button
                  onClick={() => setEditMode(!editMode)}
                  variant={'primary'}
              >
                Редактировать
              </Button>
          )) || (
              <Button onClick={handleSubmit} variant={'success'}>
                Сохранить
              </Button>
          )}
          <Link to={`/cases/`}>
            <Button onClick={handleDelete} variant={'danger'}>
              Удалить
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
