import React from "react";
import { Card } from 'react-bootstrap'

import "./styles.css";

import home from "../../assets/images/home.jpg";
import form from "../../assets/images/form.svg";
import theft from "../../assets/images/theft.svg";
import search from "../../assets/images/search.svg";

export const Home = () => {
  return (
    <div className="home">
      <img className="ride" src={home} alt="bike" />
      <div className="blob">
        <Card className="blobItem" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={theft} />
          <Card.Body>
            <Card.Text>
                Украли Велик? <br /> Постарайтесь взять себя в руки и не отчаивайтесь.
            </Card.Text>
          </Card.Body>
        </Card>
          <Card className="blobItem" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={search} />
              <Card.Body>
                  <Card.Text>
                      Внимательно осмотрите место угона на наличие каких-либо существенных
                      улик.
                  </Card.Text>
              </Card.Body>
          </Card>
          <Card className="blobItem" style={{ width: '18rem' }}>
              <Card.Img variant="top" src={form} />
              <Card.Body>
                  <Card.Text>
                      Сообщите о краже велосипеда заполнив форму на нашем сайте.
                  </Card.Text>
              </Card.Body>
          </Card>
      </div>
    </div>
  );
};
