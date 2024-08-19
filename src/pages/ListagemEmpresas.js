import React, { useState } from "react";
import { Table, Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";

const columns = [
  {
    title: "N/S",
    dataIndex: "key",
  },
  {
    title: "CNPJ",
    dataIndex: "cnpj",
  },
  {
    title: "Razão Social",
    dataIndex: "razaosocial",
  },
  {
    title: "Telefone",
    dataIndex: "telefone",
  },
  {
    title: "Nome Responsável",
    dataIndex: "nomerespo",
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
    cnpj: `5484818488848`,
    razaosocial: "Empresa LTDA",
    telefone: `58445484`,
    nomerespo: "Alisson",
    teste: "testando",
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

const ListagemEmpresas = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
        <h3 className="text-center">Empresas</h3>
        <div className="d-flex flex-column">
          <div>
            <button className="fs-7 mb-3 btn btn-secondary">Filtros</button>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <form>
                <label htmlFor="" className="fs-7 me-2">
                  Razão Social
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
                Cadastrar Empresa
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
                console.log(record);
              },
            };
          }}
          columns={columns}
          dataSource={data1}
          rowClassName="custom-table-row"
        />
        <Modal
          title="Cadastro de Empresa"
          onCancel={handleCancel}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"75%"}
        >
          <form>
            <div className="mb-3 d-flex gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="razaosocial"
                  placeholder="razaosocial"
                />
                <label htmlFor="nome">Razão Social</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  id="cnpj"
                  mask="00.000.000/0000-00"
                  placeholder="CNPJ"
                />
                <label htmlFor="cnpj">CNPJ</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  mask="000.000.000.000"
                  id="inscricaoestadual"
                  placeholder="Inscrição Estadual"
                />
                <label htmlFor="inscricaoestadual">Inscrição Estadual</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="endereco"
                  placeholder="Endereço"
                />
                <label htmlFor="endereco">Endereço</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="complemento"
                  placeholder="Complemento"
                />
                <label htmlFor="complemento">Complemento</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="bairro"
                  placeholder="Bairro"
                />
                <label htmlFor="bairro">Bairro</label>
              </div>
              <div className="form-floating w-75">
                <IMaskInput
                  className="form-control formInput"
                  mask="00000-000"
                  id="cep"
                  placeholder="Cep"
                />
                <label htmlFor="cep">Cep</label>
              </div>
              <div className="form-floating w-100">
                <select class="form-select formInput" aria-label="Default select example" id="cidade" name="cidade">
                  <option selected>Cidade</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="form-floating w-25">
              <select class="form-select formInput" aria-label="Default select example" id="uf" name="uf">
                  <option selected>UF</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  mask="(00) 0 0000-0000"
                  id="telefone"
                  placeholder="Telefone"
                />
                <label htmlFor="telefone">Telefone</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="nomeresponsavel"
                  placeholder="Nome do Responsável"
                />
                <label htmlFor="nomeresponsavel">Nome do Responsável</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="email"
                  id="emailresponsavel"
                  placeholder="Email do Responsável"
                />
                <label htmlFor="emailresponsavel">Email do Responsável</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  mask="(00) 0 0000-0000"
                  id="telefoneresponsavel"
                  placeholder="Telefone do Responsável"
                />
                <label htmlFor="telefoneresponsavel">Telefone do Responsável</label>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemEmpresas;
