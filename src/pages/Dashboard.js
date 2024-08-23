import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import moment from "moment";
import "moment/locale/pt-br";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  console.log(currentTime);

  return (
    <>
      <div className="d-flex justify-content-between w-100 h-100 inicio">
        <div></div>
        <div className="clock m-3">
          <div className="clock__space-button">
            <div className="clock__button"></div>
          </div>
          <div className="clock__display">
            <div className="display__date">
              <h1>{new Date().toLocaleDateString()}</h1>
              <p id="dia">{moment().locale("pt-br").format("dddd")}</p>
            </div>
            <div className="display__hours">
              <h1>{currentTime}</h1>
            </div>
          </div>
          <div className="clock__supports">
            <div className="support"></div>
            <div className="support"></div>
          </div>
          <div className="d-flex clock__customer">
            <h5>Bem-vindo</h5>
            <p>
              <AiOutlineUser className="fs-4 me-1" /> Alisson Rhuan Pereira da
              Silva
            </p>
            <p id="enterprise">
              <FaRegBuilding className="fs-5 me-1" />
              Lojas Gregy LTDA
            </p>
            <p id="role" style={{ color: "red" }}>
              ADMINISTRADOR
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button type="button" class="btn btn-outline-info">
              Registrar Ponto
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
