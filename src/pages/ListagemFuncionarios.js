import React, { useEffect, useState } from "react";
import { Table, Modal, Space, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { HiViewGridAdd } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  associarProjeto,
  createFuncionario,
  deleteFuncionario,
  getAllFuncionarios,
  getAllFuncionariosEmpresa,
  getAllFuncionariosProjetos,
  resetState,
  updateFuncionario,
} from "../features/auth/authSlice";
import { getProjetosEmpresa } from "../features/empresas/empresaSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomModal from "../components/CustomModal";
const moment = require("moment");

let schema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório!"),
  cpf: Yup.string().matches(/^\d{11}$/, "CPF deve ter 11 dígitos numéricos.").required("CPF é obrigatório!"),
  rg: Yup.number().required("RG é obrigatório!"),
  data_nascimento: Yup.string().required("Data de nascimento é obrigatória!"),
  endereco: Yup.string().required("Endereço é obrigatório!"),
  bairro: Yup.string().required("Bairro é obrigatório!"),
  cep: Yup.string().matches(/^\d{8}$/, "CEP deve ter 8 dígitos numéricos.").required("CEP é obrigatório!"),
  cidade: Yup.string().required("Cidade é obrigatória!"),
  uf: Yup.string().required("UF é obrigatório!"),
  telefone: Yup.string().matches(/^\d{11}$/, "Telefone deve ter 11 dígitos numéricos.").required("Telefone é obrigatório!"),
  email: Yup.string().email("Email inválido!").required("Email é obrigatório!"),
  data_admissao: Yup.string().required("Data de admissão é obrigatório!"),
  numero_banco: Yup.string().matches(/^\d{3}$/, "Código do banco deve ter 3 dígitos numéricos.").required("Código do banco é obrigatório!"),
  valor_remuneracao: Yup.number().required(
    "Valor de remuneração é obrigatório!"
  ),
  nome_banco: Yup.string().required("Nome do banco é obrigatório!"),
  agencia: Yup.number().required("Agência é obrigatória!"),
  conta: Yup.string().required("Conta é obrigatória!"),
  tipo_conta: Yup.string().required("Tipo de conta é obrigatório!"),
  
  // tipo_pix: Yup.string().required("Tipo de chave pix é obrigatório!"),
});

const columns = [
  {
    title: "Nome",
    dataIndex: "nome",
  },
  {
    title: "CPF",
    dataIndex: "cpf",
  },
  {
    title: "Telefone",
    dataIndex: "telefone",
  },
  {
    title: "Empresa",
    dataIndex: "empresa",
  },
  {
    title: "Ações",
    dataIndex: "acoes",
  },
];

const ListagemFuncionarios = () => {
  const [open, setOpen] = useState(false);
  const [openAssoc, setOpenAssoc] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingAssoc, setConfirmLoadingAssoc] = useState(false);
  const [dadosFuncAssoc, setDadosFuncAssoc] = useState(null);
  const [dadosFunc, setDadosFunc] = useState(null);
  const [disabledInputs, setDisabledInputs] = useState(false);
  const [funcionarioId, setFuncionarioId] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, nome } = useSelector((state) => state.auth.user);
  const funcionariosState = useSelector((state) => state.auth.funcionarios);
  const authState = useSelector((state) => state.auth);
  const { isSuccess, isError, isLoading, message, createdFuncionario, updatedFuncionario, deletedFuncionario, assoc } = authState;
  const projetosEmpresa = useSelector((state) => state.empresa.projetosEmpresa);
  // console.log([funcionariosState[0].projetosvinculados[0]].includes(projetosEmpresa[]?._id));
  
  const showModal = (data) => {
    data !== null ? setDisabledInputs(true) : setDisabledInputs(false);
    setDadosFunc(data);
    setOpen(true);
  };
  const showModalAssoc = (e) => {
    setDadosFuncAssoc(e);
    if (message !== "PFS") {
      dispatch(getAllFuncionariosProjetos(e.id));
    }
    if (!projetosEmpresa) {
      dispatch(getProjetosEmpresa());
    }
    setOpenAssoc(true);
  };

  const handleOk = () => {
    toast.info("Você precisa ativar a edição para enviar");
  };
  const handleCancel = () => {
    formik.resetForm()
    setConfirmLoading(false);
    setDadosFunc(null);
    setDisabledInputs(false);
    setOpen(false);
  };
  const handleOkAssoc = () => {
    alert("O Augusto quer ser Homem");
    setConfirmLoadingAssoc(true);
    setTimeout(() => {
      setOpenAssoc(false);
      setConfirmLoadingAssoc(false);
    }, 2000);
  };
  const handleCancelAssoc = () => {
    setDadosFuncAssoc(null);
    setOpenAssoc(false);
  };

  const showModalConfirm = (e) => {
    setFuncionarioId(e)
    setOpenModalConfirm(true);
  };
  const closeModalConfirm = () => {
    setFuncionarioId(0);
    setOpenModalConfirm(false);
  };

  const apontamentos = (e) => {
    navigate(`apontamentos/${e.id}`);
  };

  const associarProjetoFunc = (e) => {
    console.log(e);
    
    dispatch(associarProjeto(e))
  }

  const desassociarProjetoFunc = (e) => {
    console.log(e);
    
  }

  useEffect(() => {
    if (isSuccess && updatedFuncionario) {
      setTimeout(() => {
        toast.success("Dados do funcionario atualizados com Sucesso!");
        dispatch(resetState());
        dispatch(getAllFuncionariosEmpresa());
      }, 300);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setDadosFunc(null);
        formik.resetForm();
      }, 2000);
    } else if (isSuccess && createdFuncionario) {
      setTimeout(() => {
        toast.success("Funcionário cadastrado com Sucesso!");
        dispatch(resetState());
        dispatch(getAllFuncionariosEmpresa());
      }, 300)
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        formik.resetForm();
      }, 2000);
    } else if (isSuccess && deletedFuncionario) {
      setTimeout(() => {
        toast.success("Funcionário deletado com Sucesso!");
        setOpenModalConfirm(false);
        dispatch(resetState());
        dispatch(getAllFuncionariosEmpresa());
      }, 300)
    } else if (isSuccess && assoc) {
      setTimeout(() => {
        toast.success("Associação realizada com sucesso!");
        setOpenAssoc(false);
        dispatch(resetState());
        dispatch(getAllFuncionariosEmpresa());
      }, 1000)
    } else if (isError) {
      setTimeout(() => {
        toast.error("Algo deu errado!");
        setConfirmLoading(false);
      }, 1000);
    }
  }, [isSuccess,assoc, isError, isLoading, message, updatedFuncionario, createdFuncionario, deletedFuncionario]);

  useEffect(() => {
    if (funcionariosState.length == 0) {
      dispatch(getAllFuncionariosEmpresa());
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: dadosFunc !== null ? dadosFunc?.nome : "",
      cpf: dadosFunc !== null ? dadosFunc?.cpf : "",
      rg: dadosFunc !== null ? dadosFunc?.rg : "",
      data_nascimento:
        dadosFunc !== null ? dadosFunc?.data_nascimento : "",
      data_admissao:
        dadosFunc !== null ? dadosFunc?.data_admissao : "",
      endereco: dadosFunc !== null ? dadosFunc?.endereco : "",
      complemento: dadosFunc !== null ? dadosFunc?.complemento : "",
      bairro: dadosFunc !== null ? dadosFunc?.bairro : "",
      cep: dadosFunc !== null ? dadosFunc?.cep : "",
      cidade: dadosFunc !== null ? dadosFunc?.cidade : "",
      uf: dadosFunc !== null ? dadosFunc?.uf : "",
      telefone: dadosFunc !== null ? dadosFunc?.telefone : "",
      email: dadosFunc !== null ? dadosFunc?.email : "",
      valor_remuneracao: dadosFunc !== null ? dadosFunc?.valor_remuneracao : "",
      valor_horaextra: dadosFunc !== null ? dadosFunc?.valor_horaextra : "",
      nome_banco: dadosFunc !== null ? dadosFunc?.nome_banco : "",
      numero_banco: dadosFunc !== null ? dadosFunc?.numero_banco : "",
      agencia: dadosFunc !== null ? dadosFunc?.agencia : "",
      conta: dadosFunc !== null ? dadosFunc?.conta : "",
      tipo_conta: dadosFunc !== null ? dadosFunc?.tipo_conta : "",
      pix: dadosFunc !== null ? dadosFunc?.pix : "",
      horario1: dadosFunc !== null ? dadosFunc?.horario1 : "",
      horario2: dadosFunc !== null ? dadosFunc?.horario2 : "",
      horaextra: dadosFunc !== null ? dadosFunc?.horaextra : false,
      password: "",
      observacoes: dadosFunc !== null ? dadosFunc?.observacoes : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(dadosFunc !== null) {
        setConfirmLoading(true)
        dispatch(updateFuncionario({id: dadosFunc.id, data: values}))
      } else {
        setConfirmLoading(true)
        dispatch(createFuncionario(values))
      }
      
    },
  });

  const data1 = [];
  for (let i = 0; i < funcionariosState?.length; i++) {
    data1.push({
      key: i + 1,
      id: funcionariosState[i]._id,
      idempresa: funcionariosState[i].cod_empresa._id,
      nome: funcionariosState[i].nome,
      cpf: funcionariosState[i].cpf,
      rg: funcionariosState[i].rg,
      data_nascimento: funcionariosState[i].data_nascimento,
      data_admissao: funcionariosState[i].data_admissao,
      endereco: funcionariosState[i].endereco,
      complemento: funcionariosState[i].complemento,
      bairro: funcionariosState[i].bairro,
      cep: funcionariosState[i].cep,
      cidade: funcionariosState[i].cidade,
      uf: funcionariosState[i].uf,
      telefone: funcionariosState[i].telefone,
      email: funcionariosState[i].email,
      valor_remuneracao: funcionariosState[i].valor_remuneracao,
      valor_horaextra: funcionariosState[i].valor_horaextra,
      nome_banco: funcionariosState[i].nome_banco,
      agencia: funcionariosState[i].agencia,
      conta: funcionariosState[i].conta,
      tipo_conta: funcionariosState[i].tipo_conta,
      pix: funcionariosState[i].pix,
      horario1: funcionariosState[i].horario1,
      horario2: funcionariosState[i].horario2,
      numero_banco: funcionariosState[i].numero_banco,
      observacoes: funcionariosState[i].observacoes,
      empresa: funcionariosState[i].cod_empresa.razaosocial,
      projetosvinculados: funcionariosState[i].projetosvinculados,
      acoes: (
        <>
          <button
            onClick={() =>
              showModal({
                id: funcionariosState[i]._id,
                idempresa: funcionariosState[i].cod_empresa._id,
                nome: funcionariosState[i].nome,
                cpf: funcionariosState[i].cpf,
                rg: funcionariosState[i].rg,
                data_nascimento: funcionariosState[i].data_nascimento,
                data_admissao: funcionariosState[i].data_admissao,
                endereco: funcionariosState[i].endereco,
                complemento: funcionariosState[i].complemento,
                bairro: funcionariosState[i].bairro,
                cep: funcionariosState[i].cep,
                cidade: funcionariosState[i].cidade,
                uf: funcionariosState[i].uf,
                telefone: funcionariosState[i].telefone,
                email: funcionariosState[i].email,
                valor_remuneracao: funcionariosState[i].valor_remuneracao,
                valor_horaextra: funcionariosState[i].valor_horaextra,
                nome_banco: funcionariosState[i].nome_banco,
                agencia: funcionariosState[i].agencia,
                conta: funcionariosState[i].conta,
                tipo_conta: funcionariosState[i].tipo_conta,
                pix: funcionariosState[i].pix,
                horario1: funcionariosState[i].horario1,
                horario2: funcionariosState[i].horario2,
                numero_banco: funcionariosState[i].numero_banco,
                observacoes: funcionariosState[i].observacoes,
                empresa: funcionariosState[i].cod_empresa.razaosocial,
              })
            }
            className="bg-transparent border-0 text-blue"
          >
            <GrFormView className="fs-4" />
          </button>
          <button
            className="bg-transparent border-0 text-blue"
            onClick={() =>
              showModalAssoc({
                nome: funcionariosState[i].nome,
                id: funcionariosState[i]._id,
                projetosvinculados: funcionariosState[i].projetosvinculados,
              })
            }
          >
            <HiViewGridAdd className="fs-5" />
          </button>
          <button onClick={() => showModalConfirm(funcionariosState[i]._id)} className="bg-transparent border-0 text-danger">
            <AiFillDelete className="fs-5" />
          </button>
        </>
      ),
    });
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
  };

  const deleteAFuncionario = (id) => {
    dispatch(deleteFuncionario(id))
  }

  return (
    <div className="list-empresas">
      <div className="d-flex flex-column">
        <h3 className="text-center">Funcionários</h3>
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
                onClick={() => showModal(null)}
              >
                Cadastrar Funcionário
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
                
                apontamentos(record);
              },
            };
          }}
          columns={columns}
          dataSource={data1}
          rowClassName="custom-table-row"
        />
        <CustomModal hideModal={closeModalConfirm} open={openModalConfirm} performAction={() => {
          deleteAFuncionario(funcionarioId)
        }} title="Você tem certeza que deseja deletar essa empresa?"/>
        <Modal
          title={
            dadosFunc !== null ? "Dados da empresa" : "Cadastro de Funcionários"
          }
          onCancel={handleCancel}
          open={open}
          onOk={disabledInputs == false ? formik.handleSubmit : handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"75%"}
          styles={{
            body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
          }}
        >
          {dadosFunc !== null ? (
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
          <form onSubmit={formik.handleSubmit}>
            <h4 className="border-bottom">Dados do Funcionário</h4>
            <div className="mb-3 d-flex gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="nome"
                  placeholder="nome"
                  name="nome"
                  onChange={formik.handleChange("nome")}
                  onBlur={formik.handleBlur("nome")}
                  value={formik.values.nome}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="nome">Nome</label>
                <div className="error">
                  {formik.touched.nome && formik.errors.nome}
                </div>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  id="datanascimento"
                  mask="00-00-0000"
                  name="data_nascimento"
                  onChange={formik.handleChange("data_nascimento")}
                  onBlur={formik.handleBlur("data_nascimento")}
                  value={formik.values.data_nascimento}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="datanascimento">Data de Nascimento</label>
                <div className="error">
                  {formik.touched.data_nascimento &&
                    formik.errors.data_nascimento}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  type="text"
                  mask="00000000000"
                  className="form-control formInput"
                  id="cpf"
                  placeholder="cpf"
                  name="cpf"
                  onChange={formik.handleChange("cpf")}
                  onBlur={formik.handleBlur("cpf")}
                  value={formik.values.cpf ? String(formik.values.cpf) : ""} 
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="cpf">CPF</label>
                <div className="error">
                  {formik.touched.cpf && formik.errors.cpf}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  mask="0000000000"
                  id="rg"
                  placeholder="rg"
                  name="rg"
                  onChange={formik.handleChange("rg")}
                  onBlur={formik.handleBlur("rg")}
                  value={formik.values.rg ? String(formik.values.rg) : ""}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="rg">RG</label>
                <div className="error">
                  {formik.touched.rg && formik.errors.rg}
                </div>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  mask="00900000000"
                  id="telefone"
                  placeholder="telefone"
                  name="telefone"
                  onChange={formik.handleChange("telefone")}
                  onBlur={formik.handleBlur("telefone")}
                  value={formik.values.telefone ? String(formik.values.telefone) : ""}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="telefone">Telefone</label>
                <div className="error">
                  {formik.touched.telefone && formik.errors.telefone}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
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
                <div className="error">
                  {formik.touched.complemento && formik.errors.complemento}
                </div>
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
                  type="text"
                  mask="00000000"
                  id="cep"
                  name="cep"
                  onChange={formik.handleChange("cep")}
                  onBlur={formik.handleBlur("cep")}
                  value={formik.values.cep ? String(formik.values.cep) : ""}
                  disabled={disabledInputs === true ? true : false}
                  placeholder="Cep"
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
                  name="cidade"
                  onChange={formik.handleChange("cidade")}
                  onBlur={formik.handleBlur("cidade")}
                  value={formik.values.cidade}
                  disabled={disabledInputs === true ? true : false}
                  placeholder="Cidade"
                />
                <label htmlFor="cidade">Cidade</label>
                <div className="error">
                  {formik.touched.cidade && formik.errors.cidade}
                </div>
              </div>
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="uf"
                  name="uf"
                  onChange={formik.handleChange("uf")}
                  onBlur={formik.handleBlur("uf")}
                  value={formik.values.uf}
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
                  type="number"
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
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="email">Email</label>
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  id="dataadmissao"
                  placeholder="Data de Admissão"
                  name="data_admissao"
                  mask="00-00-0000"
                  onChange={formik.handleChange("data_admissao")}
                  onBlur={formik.handleBlur("data_admissao")}
                  value={formik.values.data_admissao}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="dataadmissao">Data de Admissão</label>
                <div className="error">
                  {formik.touched.data_admissao && formik.errors.data_admissao}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="valorremuneracao"
                  placeholder="Remuneração R$"
                  name="valor_remuneracao"
                  onChange={formik.handleChange("valor_remuneracao")}
                  onBlur={formik.handleBlur("valor_remuneracao")}
                  value={formik.values.valor_remuneracao}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="valorremuneracao">Remuneração R$</label>
                <div className="error">
                  {formik.touched.valor_remuneracao &&
                    formik.errors.valor_remuneracao}
                </div>
              </div>
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="valorhoraextra"
                  placeholder="Hora Extra R$"
                  name="valor_horaextra"
                  onChange={formik.handleChange("valor_horaextra")}
                  onBlur={formik.handleBlur("valor_horaextra")}
                  value={formik.values.valor_horaextra}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="valorhoraextra">Hora Extra R$</label>
                <div className="error">
                  {formik.touched.valor_horaextra &&
                    formik.errors.valor_horaextra}
                </div>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="horaextra"
                  onChange={(e) => formik.setFieldValue("horaextra", e.target.checked)}
                  onBlur={formik.handleBlur}
                  checked={formik.values.horaextra}
                  id="flexCheckDefault"
                  disabled={disabledInputs === true ? true : false}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Ativar Hora extra
                </label>
              </div>
            </div>
            <h4 className="border-bottom">Informações Bancarias</h4>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="banco"
                  name="nome_banco"
                  onChange={formik.handleChange("nome_banco")}
                  onBlur={formik.handleBlur("nome_banco")}
                  value={formik.values.nome_banco}
                  disabled={disabledInputs === true ? true : false}
                >
                  <option selected>Banco</option>
                  <option value="itau">Itaú</option>
                  <option value="santander">Santander</option>
                  <option value="bancodobrasil">Banco do Brasil</option>
                </select>
                <div className="error">
                  {formik.touched.nome_banco && formik.errors.nome_banco}
                </div>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  mask="000"
                  id="numerobanco"
                  placeholder="Numero do Banco"
                  name="numero_banco"
                  onChange={formik.handleChange("numero_banco")}
                  onBlur={formik.handleBlur("numero_banco")}
                  value={formik.values.numero_banco ? String(formik.values.numero_banco) : ""}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="numerobanco">Código do Banco</label>
                <div className="error">
                  {formik.touched.numero_banco && formik.errors.numero_banco}
                </div>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="agencia"
                  placeholder="Agência"
                  name="agencia"
                  onChange={formik.handleChange("agencia")}
                  onBlur={formik.handleBlur("agencia")}
                  value={formik.values.agencia}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="agencia">Agência</label>
                <div className="error">
                  {formik.touched.agencia && formik.errors.agencia}
                </div>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="conta"
                  placeholder="Conta"
                  name="conta"
                  onChange={formik.handleChange("conta")}
                  onBlur={formik.handleBlur("conta")}
                  value={formik.values.conta}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="conta">Conta</label>
                <div className="error">
                  {formik.touched.conta && formik.errors.conta}
                </div>
              </div>
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="tipoconta"
                  name="tipo_conta"
                  onChange={formik.handleChange("tipo_conta")}
                  onBlur={formik.handleBlur("tipo_conta")}
                  value={formik.values.tipo_conta}
                  disabled={disabledInputs === true ? true : false}
                >
                  <option selected>Tipo da Conta</option>
                  <option value="corrente">Corrente</option>
                  <option value="poupanca">Poupança</option>
                  <option value="salario">Salário</option>
                </select>
                <div className="error">
                  {formik.touched.tipo_conta && formik.errors.tipo_conta}
                </div>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="pix"
                  placeholder="Pix"
                  name="pix"
                  onChange={formik.handleChange("pix")}
                  onBlur={formik.handleBlur("pix")}
                  value={formik.values.pix}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="pix">Pix</label>
                <div className="error">
                  {formik.touched.pix && formik.errors.pix}
                </div>
              </div>
              {/* <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="tipopix"
                  name="tipopix"
                  onChange={formik.handleChange("tipopix")}
                  onBlur={formik.handleBlur("tipopix")}
                  value={formik.values.tipopix}
                  disabled={disabledInputs === true ? true : false}
                >
                  <option selected>Tipo da Chave Pix</option>
                  <option value="telefone">Telefone</option>
                  <option value="aleatoria">Aleatória</option>
                  <option value="cpf">Cpf</option>
                  <option value="email">Email</option>
                </select>
                <div className="error">
                  {formik.touched.tipopix && formik.errors.tipopix}
                </div>
              </div> */}
            </div>
            <h4 className="border-bottom">Outros Dados</h4>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  mask="00:00 - 00:00"
                  id="horario1"
                  placeholder="Horário Manhã"
                  name="horario1"
                  onChange={formik.handleChange("horario1")}
                  onBlur={formik.handleBlur("horario1")}
                  value={formik.values.horario1}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="horario1">Horário Manhã</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  mask="00:00 - 00:00"
                  id="horario2"
                  placeholder="Horário Tarde"
                  name="horario2"
                  onChange={formik.handleChange("horario2")}
                  onBlur={formik.handleBlur("horario2")}
                  value={formik.values.horario2}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="horario2">Horário Tarde</label>
              </div>
              {dadosFunc !== null ? (
                ""
              ) : (
                <div className="form-floating w-50">
                  <Space direction="vertical" />
                  <Input.Password
                    className="formInput"
                    id="password"
                    name="password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                    placeholder="Senha de Acesso"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex mb-3 gap-2">
              <div class="form-floating w-100">
                <textarea
                  class="form-control"
                  placeholder="Insira as Observações"
                  id="observacoes"
                  style={{ height: "100px", resize: "none" }}
                  name="observacoes"
                  onChange={formik.handleChange("observacoes")}
                  onBlur={formik.handleBlur("observacoes")}
                  value={formik.values.observacoes}
                  disabled={disabledInputs === true ? true : false}
                ></textarea>
                <label for="observacoes">Observações</label>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          title="Associação"
          onCancel={handleCancelAssoc}
          open={openAssoc}
          onOk={handleOkAssoc}
          confirmLoading={confirmLoadingAssoc}
          maskClosable={false}
          width={"60%"}
        >
          <div className="container-xxl">
            <div className="tabelaAssoc_linhas w-100 ">
              <div className="d-flex">
                <div className="linha">
                  <h5 className="fs-5 me-2">Funcionário</h5>
                </div>
                <div className="w-100">
                  <h5 className="text-center">{dadosFuncAssoc?.nome}</h5>
                </div>
              </div>
            </div>
            <br />
            <div className="tabelaAssoc_linhas w-100 border-top-0">
            {projetosEmpresa?.map((item, index) => (
                <div key={index} className="d-flex tabelaAssoc_linhas border-bottom-0 border-start-0 border-end-0">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75 linha me-4">
                    <h6 className="text-projetos">
                      {item.nome == "Teste1" ? `${item.nome} teste` : item.nome}
                    </h6>
                  </div>
                  <div className="fs-5">
                      <span onClick={() => dadosFuncAssoc?.projetosvinculados.includes(item._id) ? desassociarProjetoFunc({idProjeto: item._id, idFuncionario: dadosFuncAssoc.id}) : associarProjetoFunc({idProjeto: item._id, idFuncionario: dadosFuncAssoc.id})} 
                      style={{ cursor: "pointer" }}>[{dadosFuncAssoc?.projetosvinculados.includes(item._id) ? ' X ' : 'ㅤ'}]</span>
                  </div>
                </div>
                ))}
              </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemFuncionarios;
