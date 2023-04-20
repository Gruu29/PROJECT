import React from "react";

import { FaTelegram, FaWhatsapp, FaPhone } from "react-icons/fa";

import "./styles.css";

export const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div>
          <FaTelegram size="2rem" /> <FaWhatsapp size="2rem" />
        </div>
        <div>
          <b>Работу выполнил Груздев И.</b>
        </div>
        <div>
          <a className="tel text-white" href="tel:+79038962510">
            <FaPhone size="1rem" />
            +79038962510
          </a>
        </div>
      </div>
    </footer>
  );
};