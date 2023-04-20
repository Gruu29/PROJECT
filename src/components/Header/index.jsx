import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap'

import "./styles.css";

import logo from "../../assets/images/logo_2.svg";

export const Header = ({ admin, setAdmin }) => {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("admin");
    if (loggedInUser) setAdmin(loggedInUser);
  }, []);

  // handle: click
  const handleClick = () => {
    setAdmin(!admin);
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="prime" variant="dark">
      <Container>
        <Link className="logoLink" to={"/"}>
          <div className="size">
            <img width={40} height={40} src={logo} alt="bicycles" />
            BICYCLES
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"/>
          <Nav>
            {admin && (
              <>
                <Link className="link" to={"/officers"}>
                  <li>Ответственный сотрудник</li>
                </Link>
                <Link className="link" to={"/cases/"}>
                  <li>Все кражи</li>
                </Link>
              </>
            )}
            {(!admin && (
              <>
                <Link className="link" to={"/public/report"}>
                  <li>Сообщить о краже</li>
                </Link>

                <Link className="link" to={"/auth/registration"}>
                  <li>Регистрация</li>
                </Link>
                <Link className="link" to={"/auth/login"}>
                  <li>Войти</li>
                </Link>
              </>
            )) || (
              <>
                <Link className="link" to={"/"}>
                  <li onClick={handleClick}>Выйти</li>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
