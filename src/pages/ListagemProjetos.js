import React, { useState } from "react";
import { Table, Modal, Space, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "nome",
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
  },
  {
    title: "Horas Estimadas",
    dataIndex: "horasestimadas",
  },
  {
    title: "Ações",
    dataIndex: "acoes",
  },
];
const data1 = [];
for (let i = 0; i < 25; i++) {
  data1.push({
    key: i + 1,
    nome: `Alisson Rhuan`,
    descricao: "081.013.301-60",
    horasestimadas: `58445484`,
    acoes: (
      <>
        <button className="bg-transparent border-0 text-blue">
          <GrFormView className="fs-4" />
        </button>
        <button className="bg-transparent border-0 text-danger">
          <AiFillDelete className="fs-5" />
        </button>
      </>
    ),
  });
}

const ListagemProjetos = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
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
    console.log("Clicked cancel button");
    setOpen(false);
  };


  return (
    <div className="list-empresas">
      <div className="d-flex flex-column">
        <h3 className="text-center">Projetos</h3>
        <div className="d-flex flex-column">
          <div>
            <button className="fs-7 mb-3 btn btn-secondary">Filtros</button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <form>
                <label htmlFor="" className="fs-7 me-2">
                  Nome
                </label>
                <input className="fs-7 me-2 inputFiltro" />
                <button
                  type="button"
                  className="buttonsearch bg-transparent border-0"
                >
                  <FaSearch className="fs-5 iconsearch" />
                </button>
              </form>
            </div>
            <div className="d-flex ">
              <button
                className="btn btn-outline-primary mb-3"
                onClick={showModal}
              >
                Cadastrar Projeto
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Table
          size="small"
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                
              },
            };
          }}
          columns={columns}
          dataSource={data1}
          rowClassName="custom-table-row"
        />
        <Modal
          title="Cadastro de Projetos"
          onCancel={handleCancel}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"50%"}
        >
          <form>
            <h4 className="border-bottom">Dados do Projeto</h4>
            <div className="mb-3">
              <div className="form-floating w-100 mb-3">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="nome"
                  placeholder="nome"
                />
                <label htmlFor="nome">Nome</label>
              </div>
              <div className="form-floating w-100 mb-3">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="descricao"
                  placeholder="Descrição"
                />
                <label htmlFor="descricao">Descrição</label>
              </div>
              <div className="form-floating w-25 mb-3">
                <IMaskInput
                  type="number"
                  className="form-control formInput"
                  id="horasestimadas"
                  placeholder="Horas estimadas"
                />
                <label htmlFor="horasestimadas">Horas estimadas</label>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemProjetos;
