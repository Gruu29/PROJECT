import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap'

import { Link } from "react-router-dom";
import { ReportAuth } from "../Report/Auth";
import { ReportDetails } from "../../components/ReportDetails";

import "./styles.css";

import staff from "../../assets/images/officers.svg";

export const Messages = ({ approved, setApproved }) => {
  // state: cases
  const [cases, setCases] = useState([]);

  // state: detail
  const [detail, setDetail] = useState(false);

  // state: loading
  const [loading, setLoading] = useState(false);

  // state: new message
  const [newMessage, setNewMessage] = useState(false);

  // handle: change detail
  const handleDetail = () => setDetail(!detail);

  // request: get messages
  const getMessages = async () => {
    setLoading(true);
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/cases/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    ).finally(() => setLoading(false));

    setCases(result.data.data);
  };

  useEffect(() => {
    getMessages();
  }, [detail, newMessage]);

  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h3 className="title">Все сообщения о кражах</h3>
      <div className="wrapper">
        <Button
          className="addMessage"
          onClick={() => setNewMessage(!newMessage)}
        >
          Добавить сообщение
        </Button>

        {loading ? (
          <div className="loading" style={{ alignSelf: "center" }}>
            loading...
          </div>
        ) :
          cases.length === 0 ? <div/> :
          (newMessage && (
            <ReportAuth
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              approved={approved}
              setApproved={setApproved}
            />
          ))}
        <div className="messageContainer">
          {cases.map((item) => (
            <div key={item._id} className="message">
              <span
                className="new"
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  minWidth: "90px",
                  backgroundColor:
                    (item.status === "new" && "green") ||
                    (item.status === "in_progress" && "rgb(209, 130, 19)") ||
                    (item.status === "done" && "red"),
                }}
              >
                {item.status}
              </span>
              <Link
                onClick={handleDetail}
                className="link"
                to={`/cases/${item._id}`}
              >
                <li>{item.ownerFullName}</li>
              </Link>
            </div>
          ))}
        </div>
        {detail && (
          <ReportDetails
            cases={cases}
            detail={detail}
            setDetail={setDetail}
            approved={approved}
            setApproved={setApproved}
          />
        )}
      </div>
    </div>
  );
};
