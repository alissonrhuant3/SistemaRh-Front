import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { getEmpresas } from "../features/empresas/empresaSlice";

const columns = [
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
    title: "Cidade",
    dataIndex: "cidade",
  },
  {
    title: "UF",
    dataIndex: "uf",
  },
  {
    title: "Ações",
    dataIndex: "acoes",
  },
];


const ListagemEmpresas = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);
  const [disabledInputs, setDisabledInputs] = useState(false);
  console.log(activeRecord);
  
  const dispatch = useDispatch();
  const getEmpresaState = useSelector((state) => state.empresa.empresas)
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
    setActiveRecord(null);
    setDisabledInputs(false);
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEmpresas())
  },[])

  const data1 = [];
  for (let i = 0; i < getEmpresaState?.length; i++) {
  data1.push({
    key: i + 1,
    cnpj: getEmpresaState[i]?.cnpj,
    razaosocial: getEmpresaState[i]?.razaosocial,
    inscricaoestadual: getEmpresaState[i]?.inscricaoestadual,
    endereco: getEmpresaState[i]?.endereco,
    complemento: getEmpresaState[i]?.complemento,
    bairro: getEmpresaState[i]?.bairro,
    cep: getEmpresaState[i]?.cep,
    cidade: getEmpresaState[i]?.cidade,
    uf: getEmpresaState[i]?.uf,
    telefone: getEmpresaState[i]?.telefone,
    nomerespo: getEmpresaState[i]?.nomeresponsavel,
    emailresponsavel: getEmpresaState[i]?.emailresponsavel,
    telefoneresponsavel: getEmpresaState[i]?.telefoneresponsavel,
    id: getEmpresaState[i]?._id,
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
                setOpen(true);
                setActiveRecord(record);
                setDisabledInputs(true);
              },
            };
          }}
          columns={columns}
          dataSource={data1}
          rowClassName="custom-table-row"
        />
        <Modal
          title={activeRecord !== null ? "Dados da Empresa" : "Cadastro de Empresa"}
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
                  value = {activeRecord !== null ? activeRecord?.razaosocial : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="nome">Razão Social</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  id="cnpj"
                  placeholder="CNPJ"
                  value = {activeRecord !== null ? activeRecord?.cnpj : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="cnpj">CNPJ</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="inscricaoestadual"
                  placeholder="Inscrição Estadual"
                  value = {activeRecord !== null ? activeRecord?.inscricaoestadual : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="inscricaoestadual">Inscrição Estadual</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="endereco"
                  placeholder="Endereço"
                  value = {activeRecord !== null ? activeRecord?.endereco : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="endereco">Endereço</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="complemento"
                  placeholder="Complemento"
                  value = {activeRecord !== null ? activeRecord?.complemento : ""}
                  disabled= {disabledInputs === true ? true : false}
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
                  value = {activeRecord !== null ? activeRecord?.bairro : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="bairro">Bairro</label>
              </div>
              <div className="form-floating w-75">
                <IMaskInput
                  className="form-control formInput"
                  id="cep"
                  placeholder="Cep"
                  value = {activeRecord !== null ? activeRecord?.cep : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="cep">Cep</label>
              </div>
              <div className="form-floating w-100">
                <select class="form-select formInput" aria-label="Default select example" id="cidade" name="cidade" value={activeRecord !== null ? activeRecord?.cidade : ""} disabled= {disabledInputs === true ? true : false}>
                  <option selected>Cidade</option>
                  <option value="Cidade Exemplo">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="form-floating w-25">
              <select value={activeRecord !== null ? activeRecord?.uf : ""} class="form-select formInput" aria-label="Default select example" id="uf" name="uf" disabled= {disabledInputs === true ? true : false}>
                  <option selected>UF</option>
                  <option value="SP">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="telefone"
                  placeholder="Telefone"
                  value = {activeRecord !== null ? activeRecord?.telefone : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="telefone">Telefone</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="nomeresponsavel"
                  placeholder="Nome do Responsável"
                  value = {activeRecord !== null ? activeRecord?.nomerespo : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="nomeresponsavel">Nome do Responsável</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="email"
                  id="emailresponsavel"
                  placeholder="Email do Responsável"
                  value = {activeRecord !== null ? activeRecord?.emailresponsavel : ""}
                  disabled= {disabledInputs === true ? true : false}
                />
                <label htmlFor="emailresponsavel">Email do Responsável</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="telefoneresponsavel"
                  placeholder="Telefone do Responsável"
                  value = {activeRecord !== null ? activeRecord?.telefoneresponsavel : ""}
                  disabled= {disabledInputs === true ? true : false}
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
