import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmpresa,
  deleteEmpresa,
  getEmpresas,
  resetState,
  updateEmpresa,
} from "../features/empresas/empresaSlice";
import { FaRegEdit } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";

let schema = Yup.object().shape({
  razaosocial: Yup.string().required("Razão Social da empresa é obrigatório!"),
  cnpj: Yup.number().required("cnpj é Requerido!"),
  inscricaoestadual: Yup.number().required("Inscrição Estadual é Requerido!"),
  endereco: Yup.string().required("Endereço é Obrigatório!"),
  bairro: Yup.string().required("Bairro é Obrigatório!"),
  cidade: Yup.string().required("Cidade é Obrigatório!"),
  cep: Yup.number().required("cep é Obrigatório!"),
  uf: Yup.string().required("UF é Obrigatório!"),
  telefone: Yup.number().required("Telefone é Obrigatório!"),
  nomeresponsavel: Yup.string().required("Nome do Responsável é Obrigatório!"),
  emailresponsavel: Yup.string().required(
    "Email do Responsável é Obrigatório!"
  ),
  telefoneresponsavel: Yup.number().required(
    "Telefone do Responsável é Obrigatório!"
  ),
});

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
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [empresaId, setEmpresaId] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);
  const [disabledInputs, setDisabledInputs] = useState(false);


  const dispatch = useDispatch();
  const getEmpresaState = useSelector((state) => state.empresa.empresas);
  const getEmpresaEstado = useSelector((state) => state.empresa);
  const { isSuccess, isError, isLoading, message, updatedEmpresa, createdEmpresa } =
    getEmpresaEstado;
  const showModal = () => {
    setOpen(true);
  };
  const showModalConfirm = (e) => {
    setEmpresaId(e)
    setOpenModalConfirm(true);
  };
  const closeModalConfirm = () => {
    setEmpresaId(0);
    setOpenModalConfirm(false);
  };
  const handleOk = () => {
    toast.info("Você precisa ativar a edição para enviar");
  };
  const handleCancel = () => {
    setActiveRecord(null);
    setDisabledInputs(false);
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess && updatedEmpresa) {
      setTimeout(() => {
        toast.success("Dados da empresa atualizados com Sucesso!");
        dispatch(resetState());
        dispatch(getEmpresas());
      }, 300);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setActiveRecord(null);
        formik.resetForm();
      }, 2000);
    } else if (isSuccess && createdEmpresa) {
      setTimeout(() => {
        toast.success("Empresa cadastrada com Sucesso!");
        dispatch(resetState());
        dispatch(getEmpresas());
      }, 300)
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        formik.resetForm();
      }, 2000);
    } else if (isError) {
      setTimeout(() => {
        toast.error("Algo deu errado!");
        setConfirmLoading(false);
      }, 1000);
    }
  }, [isSuccess, isError, isLoading, message, updatedEmpresa, createdEmpresa]);

  useEffect(() => {
    dispatch(getEmpresas());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      razaosocial: activeRecord !== null ? activeRecord?.razaosocial : "",
      uf: activeRecord !== null ? activeRecord?.uf : "",
      cnpj: activeRecord !== null ? activeRecord?.cnpj : "",
      inscricaoestadual:
        activeRecord !== null ? activeRecord?.inscricaoestadual : "",
      endereco: activeRecord !== null ? activeRecord?.endereco : "",
      complemento: activeRecord !== null ? activeRecord?.complemento : "",
      bairro: activeRecord !== null ? activeRecord?.bairro : "",
      cep: activeRecord !== null ? activeRecord?.cep : "",
      cidade: activeRecord !== null ? activeRecord?.cidade : "",
      telefone: activeRecord !== null ? activeRecord?.telefone : "",
      nomeresponsavel: activeRecord !== null ? activeRecord?.nomerespo : "",
      emailresponsavel:
        activeRecord !== null ? activeRecord?.emailresponsavel : "",
      telefoneresponsavel:
        activeRecord !== null ? activeRecord?.telefoneresponsavel : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (activeRecord !== null) {
        setConfirmLoading(true);
        dispatch(updateEmpresa({ id: activeRecord.id, empresaData: values }));
      } else {
        setConfirmLoading(true);
        dispatch(createEmpresa(values));
      }
      // if (getBlogId !== undefined) {

      // } else {
      //   dispatch(createBlog(values));
      //   formik.resetForm();
      //   setTimeout(() => {
      //     // dispatch(resetState());
      //   }, 300);
      // }
    },
  });

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
          <button onClick={() => showModalConfirm(getEmpresaState[i]._id)} className="bg-transparent border-0 text-danger">
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const deleteAEmpresa = (e) => {
    dispatch(deleteEmpresa(e));
    setOpenModalConfirm(false);
    setTimeout(() => {
      dispatch(getEmpresas());
    }, 100);
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
        <CustomModal hideModal={closeModalConfirm} open={openModalConfirm} performAction={() => {
          deleteAEmpresa(empresaId)
        }} title="Você tem certeza que deseja deletar essa empresa?"/>
        <Modal
          title={
            activeRecord !== null ? "Dados da Empresa" : "Cadastro de Empresa"
          }
          open={open}
          onCancel={handleCancel}
          onOk={disabledInputs === false ? formik.handleSubmit : handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"75%"}
        >
          {activeRecord !== null ? (
            <div className="text-end buttonEditOnOFf">
              <FaRegEdit
                title={
                  disabledInputs === false
                    ? "Desabilitar Edição"
                    : "Habilitar Edição"
                }
                onClick={() =>
                  disabledInputs === false
                    ? setDisabledInputs(true)
                    : setDisabledInputs(false)
                }
                className={`${
                  disabledInputs === false ? "bg-gray" : ""
                } mb-2 buttonEditOnOff__button`}
              />
            </div>
          ) : (
            ""
          )}
          <form className="formEmpresa" onSubmit={formik.handleSubmit}>
            <div className="mb-3 d-flex gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="razaosocial"
                  placeholder="razaosocial"
                  name="razaosocial"
                  onChange={formik.handleChange("razaosocial")}
                  onBlur={formik.handleBlur("razaosocial")}
                  value={formik.values.razaosocial}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="nome">Razão Social</label>
                <div className="error">
                  {formik.touched.razaosocial && formik.errors.razaosocial}
                </div>
              </div>

              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  id="cnpj"
                  placeholder="CNPJ"
                  name="cnpj"
                  maxLength={14}
                  onChange={formik.handleChange("cnpj")}
                  onBlur={formik.handleBlur("cnpj")}
                  value={formik.values.cnpj}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="cnpj">CNPJ</label>
                <div className="error">
                  {formik.touched.cnpj && formik.errors.cnpj}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="inscricaoestadual"
                  placeholder="Inscrição Estadual"
                  name="inscricaoestadual"
                  onChange={formik.handleChange("inscricaoestadual")}
                  onBlur={formik.handleBlur("inscricaoestadual")}
                  value={formik.values.inscricaoestadual}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="inscricaoestadual">Inscrição Estadual</label>
                <div className="error">
                  {formik.touched.inscricaoestadual &&
                    formik.errors.inscricaoestadual}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="endereco"
                  placeholder="Endereço"
                  name="endereco"
                  onChange={formik.handleChange("endereco")}
                  onBlur={formik.handleBlur("endereco")}
                  value={formik.values.endereco}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="endereco">Endereço</label>
                <div className="error">
                  {formik.touched.endereco && formik.errors.endereco}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="complemento"
                  placeholder="Complemento"
                  name="complemento"
                  onChange={formik.handleChange("complemento")}
                  onBlur={formik.handleBlur("complemento")}
                  value={formik.values.complemento}
                  disabled={disabledInputs === true ? true : false}
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
                  name="bairro"
                  onChange={formik.handleChange("bairro")}
                  onBlur={formik.handleBlur("bairro")}
                  value={formik.values.bairro}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="bairro">Bairro</label>
                <div className="error">
                  {formik.touched.bairro && formik.errors.bairro}
                </div>
              </div>
              <div className="form-floating w-75">
                <IMaskInput
                  className="form-control formInput"
                  id="cep"
                  placeholder="Cep"
                  name="cep"
                  onChange={formik.handleChange("cep")}
                  onBlur={formik.handleBlur("cep")}
                  value={formik.values.cep}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="cep">Cep</label>
                <div className="error">
                  {formik.touched.cep && formik.errors.cep}
                </div>
              </div>
              <div className="form-floating w-100">
              <IMaskInput
                  className="form-control formInput"
                  id="cidade"
                  placeholder="cidade"
                  name="cidade"
                  onChange={formik.handleChange("cidade")}
                  onBlur={formik.handleBlur("cidade")}
                  value={formik.values.cidade}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="cidade">Cidade</label>
                <div className="error">
                  {formik.touched.cidade && formik.errors.cidade}
                </div>
              </div>
              <div className="form-floating w-25">
                <select
                  value={formik.values.uf}
                  className="form-select formInput formEmpresa__uf"
                  aria-label="Default select example"
                  onChange={formik.handleChange("uf")}
                  onBlur={formik.handleBlur("uf")}
                  id="uf"
                  name="uf"
                  disabled={disabledInputs === true ? true : false}
                >
                  <option selected>UF</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
                <div className="error">
                  {formik.touched.uf && formik.errors.uf}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="telefone"
                  placeholder="Telefone"
                  name="telefone"
                  onChange={formik.handleChange("telefone")}
                  onBlur={formik.handleBlur("telefone")}
                  value={formik.values.telefone}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="telefone">Telefone</label>
                <div className="error">
                  {formik.touched.telefone && formik.errors.telefone}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="nomeresponsavel"
                  placeholder="Nome do Responsável"
                  name="nomeresponsavel"
                  onChange={formik.handleChange("nomeresponsavel")}
                  onBlur={formik.handleBlur("nomeresponsavel")}
                  value={formik.values.nomeresponsavel}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="nomeresponsavel">Nome do Responsável</label>
                <div className="error">
                  {formik.touched.nomeresponsavel &&
                    formik.errors.nomeresponsavel}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="email"
                  id="emailresponsavel"
                  placeholder="Email do Responsável"
                  name="emailresponsavel"
                  onChange={formik.handleChange("emailresponsavel")}
                  onBlur={formik.handleBlur("emailresponsavel")}
                  value={formik.values.emailresponsavel}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="emailresponsavel">Email do Responsável</label>
                <div className="error">
                  {formik.touched.emailresponsavel &&
                    formik.errors.emailresponsavel}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="telefoneresponsavel"
                  placeholder="Telefone do Responsável"
                  name="telefoneresponsavel"
                  onChange={formik.handleChange("telefoneresponsavel")}
                  onBlur={formik.handleBlur("telefoneresponsavel")}
                  value={formik.values.telefoneresponsavel}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="telefoneresponsavel">
                  Telefone do Responsável
                </label>
                <div className="error">
                  {formik.touched.telefoneresponsavel &&
                    formik.errors.telefoneresponsavel}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemEmpresas;
