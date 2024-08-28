import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import moment from "moment";
import "moment/locale/pt-br";
import { verifyExpJwtToken } from "../utils/axiosconfig";
import { Modal } from "antd";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("");
  
  const showModal = () => {
    setOpen(true);
    setHour(moment().format('h:mm:ss A'))
  };
  const handleOk = () => {
    alert("O Augusto quer ser Homem");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  if(verifyExpJwtToken() === false) {
    window.location.replace("http://localhost:3000/")
  } else if (verifyExpJwtToken() === "Usuário não logado") {
    window.location.replace("http://localhost:3000/")
  }
  
  useEffect(() => {
    
  },[])

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

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
            <button onClick={showModal} type="button" className="btn btn-outline-info">
              Registrar Ponto
            </button>
            <Modal
              title="Registro de ponto"
              onCancel={handleCancel}
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              maskClosable={false}
              width={"50%"}
              styles={{
                body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)", paddingBottom: 10 },
              }}
            >
              <div className="container-xxl">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <h5>Funcionário:</h5>
                    <p className="">Alisson Rhuan Pereira da Silva</p>
                  </div>
                  <div className="">
                    <h6>DATA/HORA:</h6>
                    <span>{moment().format('DD/MM/YYYY, h:mm:ss A')}</span>
                  </div>
                </div>
                <div className="d-flex">
                  <form action="" className="d-flex">
                    <div>
                      <label className="ms-2" htmlFor="projeto">Selecione o projeto</label>
                    <select className="form-select" id="projeto" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    </div>
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">Tarefa</label>
                      <input class="form-control" id="default" type="text" aria-label="default input example"/>
                    </div>
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">Data</label>
                      <input class="form-control" disabled value={moment().format('DD/MM/YYYY')} id="default" type="text" aria-label="default input example"/>
                    </div>
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">Hora Inicio</label>
                      <input class="form-control" disabled value={hour} id="default" type="text" aria-label="default input example"/>
                    </div>
                  </form>
                  </div>
              </div>
              </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
