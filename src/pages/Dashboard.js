import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import moment from "moment";
import "moment/locale/pt-br";
import { verifyExpJwtToken } from "../utils/axiosconfig";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProjetosEmpresa } from "../features/empresas/empresaSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getFuncionarioProjetos, registerPontoFuncionario } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { replace_url2 } from "../utils/base_url";

let schema = Yup.object().shape({
  tarefa: Yup.string().required("Tarefa é obrigatório!"),
  projeto: Yup.string().required("Projeto é obrigatório!"),
});

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState("");
  const dispatch = useDispatch();
  const projetosState = useSelector((state) => state.auth.funcprojetos);
  const authState = useSelector((state) => state.auth)
  const {isSuccess, isLoading, isError, message} = authState;

  if (verifyExpJwtToken() === false) {
    window.location.replace(replace_url2);
  } else if (verifyExpJwtToken() === "Usuário não logado") {
    window.location.replace(replace_url2);
  }

  const showModal = () => {
    if (projetosState.length == 0) dispatch(getFuncionarioProjetos());
    setOpen(true);
    setHour(moment().format("h:mm:ss A"));
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(`${message}`)
    } else if (isSuccess && message === "Ponto registrado com Sucesso") {
      toast.success("Ponto registrado com sucesso")
    }
  }, [isSuccess, isLoading, isError, message]);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tarefa: "",
      projeto: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registerPontoFuncionario(values))
    },
  });

  return (
    <>
      <div className="d-flex justify-content-between w-100 h-100 inicio">
        <div className="mt-2 ms-2 inicio_instrucoes bg-white">
          <h3 className="text-center text-info fs-2 mt-1">Instruções</h3>
          <div className="ms-2">
            <p className="fs-3 border-bottom">* Regras para registro de ponto: </p>
            <li className="fs-5">Horário de entrada manhã: 08:00 até 09:30</li>
            <li className="fs-5">Horário de saída manhã: 09:30 até 12:10</li>
            <li className="fs-5">Horário de entrada tarde: 12:10 até 14:10</li>
            <li className="fs-5">Horário de saída tarde: 14:10 até 18:00</li>
          </div>
        </div>
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
              <AiOutlineUser className="fs-4 me-1" /> {authState.user.nome}
            </p>
            <p id="enterprise">
              <FaRegBuilding className="fs-5 me-1" />
              {authState.user.empresa}
            </p>
            <p id="role" style={{ color: "" }}>
            {authState.user.role}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <button
              onClick={showModal}
              type="button"
              className="btn btn-outline-info"
            >
              Registrar Ponto
            </button>
            <Modal
              title="Registro de ponto"
              onCancel={handleCancel}
              open={open}
              onOk={formik.handleSubmit}
              confirmLoading={confirmLoading}
              maskClosable={false}
              width={"50%"}
              styles={{
                body: {
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 200px)",
                  paddingBottom: 10,
                },
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
                    <span>{moment().format("DD/MM/YYYY, h:mm:ss A")}</span>
                  </div>
                </div>
                <div className="d-flex">
                  <form action="" className="d-flex">
                    <div>
                      <label className="ms-2" htmlFor="projeto">
                        Selecione o projeto
                      </label>
                      <select
                        className="form-select"
                        id="projeto"
                        aria-label="Default select example"
                        name="projeto"
                        onChange={formik.handleChange("projeto")}
                        onBlur={formik.handleBlur("projeto")}
                      >
                        <option selected>Selecione</option>
                        {projetosState?.map((item, index) => (
                          <option value={item._id}>{item.nome}</option>
                        ))}
                      </select>
                      <div className="error">
                      {formik.touched.projeto && formik.errors.projeto}
                    </div>
                    </div>
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">
                        Tarefa
                      </label>
                      <input
                        class="form-control"
                        id="default"
                        type="text"
                        name="tarefa"
                        onChange={formik.handleChange("tarefa")}
                        onBlur={formik.handleBlur("tarefa")}
                        aria-label="default input example"
                      />
                      <div className="error">
                      {formik.touched.tarefa && formik.errors.tarefa}
                    </div>
                    </div>
                    
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">
                        Data
                      </label>
                      <input
                        class="form-control"
                        disabled
                        value={moment().format("DD/MM/YYYY")}
                        id="default"
                        type="text"
                        aria-label="default input example"
                      />
                    </div>
                    <div class="ms-2">
                      <label htmlFor="default" className="form-label mb-0">
                        Hora Inicio
                      </label>
                      <input
                        class="form-control"
                        disabled
                        value={hour}
                        id="default"
                        type="text"
                        aria-label="default input example"
                      />
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
