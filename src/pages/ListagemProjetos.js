import React, { useEffect, useState } from "react";
import { Table, Modal, Space, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit, FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjetosEmpresa } from "../features/empresas/empresaSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createProjetos, deleteProjeto, getAllProjetos, resetState, updateAProjeto } from "../features/projetos/projetoSlice";
import CustomModal from "../components/CustomModal";

let schema = Yup.object().shape({
  nome: Yup.string().required("Nome do projeto é obrigatório!"),
  descricao: Yup.string().required("Descrição é Requerido!"),
  horasestimadas: Yup.number().required("Horas estimadas é Requerido!"),
});

const columns = [
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


const ListagemProjetos = () => {
  const [open, setOpen] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);
  const [disabledInputs, setDisabledInputs] = useState(false);
  const [projetoId, setProjetoId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projetosState = useSelector((state) => state.empresa.projetosEmpresa)
  const projetosEstado = useSelector((state) => state.projeto)
  const { isSuccess, isError, isLoading, message, updatedProjeto,createdProjeto, deletedProjeto } = projetosEstado;
  const showModal = () => {
    setOpen(true);
  };
  const showModalConfirm = (e) => {
    setProjetoId(e)
    setOpenModalConfirm(true);
  };
  const closeModalConfirm = () => {
    setProjetoId(0);
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
    if (isSuccess && updatedProjeto) {
      setTimeout(() => {
        toast.success("Dados do projeto atualizados com Sucesso!");
        dispatch(resetState());
        dispatch(getProjetosEmpresa());
      }, 300);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        setActiveRecord(null);
        formik.resetForm();
      }, 2000);
    } else if (isSuccess && createdProjeto) {
      setTimeout(() => {
        toast.success("Projeto cadastrada com Sucesso!");
        dispatch(resetState());
        dispatch(getProjetosEmpresa());
      }, 300)
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        formik.resetForm();
      }, 2000);
    } else if (isSuccess && deletedProjeto) {
      setTimeout(() => {
        toast.success("Projeto deletado com Sucesso!");
        dispatch(resetState());
        dispatch(getProjetosEmpresa());
      }, 50)
    } else if (isError) {
      setTimeout(() => {
        toast.error("Algo deu errado!");
        setConfirmLoading(false);
      }, 1000);
    }
  }, [isSuccess, isError, isLoading, message, updatedProjeto, createdProjeto, deletedProjeto]);

  useEffect(() => {
    dispatch(getProjetosEmpresa())
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: activeRecord !== null ? activeRecord?.nome : "",
      descricao: activeRecord !== null ? activeRecord?.descricao : "",
      horasestimadas: activeRecord !== null ? activeRecord?.horasestimadas : "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      if (activeRecord !== null) {
        setConfirmLoading(true);
        dispatch(updateAProjeto({ id: activeRecord.id, projetoData: values }));
      } else {
        setConfirmLoading(true);
        dispatch(createProjetos(values));
      }
    }
  });

  const data1 = [];
  for (let i = 0; i < projetosState?.length; i++) {
  data1.push({
    key: i + 1,
    nome: projetosState[i].nome,
    descricao: projetosState[i].descricao,
    horasestimadas: projetosState[i].horasestimadas,
    empresa: projetosState[i].empresa,
    id: projetosState[i]._id,
    createdAt: projetosState[i].createdAt,
    updatedAt: projetosState[i].updatedAt,
    acoes: (
      <>
        <button className="bg-transparent border-0 text-blue">
          <GrFormView className="fs-4" />
        </button>
        <button onClick={() => showModalConfirm(projetosState[i]._id)} className="bg-transparent border-0 text-danger">
          <AiFillDelete className="fs-5" />
        </button>
      </>
    ),
  });
}

  const deleteAProjeto = (e) => {
    dispatch(deleteProjeto(e));
    setOpenModalConfirm(false);
    setTimeout(() => {
      dispatch(getProjetosEmpresa());
    }, 100);
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
                console.log(record);
                
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
          deleteAProjeto(projetoId)
        }} title="Você tem certeza que deseja deletar essa empresa?"/>
        <Modal
          title= {activeRecord !== null ? "Edição de Projeto" : "Cadastro de Projetos"}
          onCancel={handleCancel}
          open={open}
          onOk={disabledInputs === false ? formik.handleSubmit : handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"50%"}
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
          <form>
            <h4 className="border-bottom">Dados do Projeto</h4>
            <div className="mb-3">
              <div className="form-floating w-100 mb-3">
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
              <div className="form-floating w-100 mb-3">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="descricao"
                  placeholder="Descrição"
                  name="descricao"
                  onChange={formik.handleChange("descricao")}
                  onBlur={formik.handleBlur("descricao")}
                  value={formik.values.descricao}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="descricao">Descrição</label>
                <div className="error">
                  {formik.touched.descricao && formik.errors.descricao}
                </div>
              </div>
              <div className="form-floating w-25 mb-3">
                <IMaskInput
                  type="number"
                  className="form-control formInput"
                  id="horasestimadas"
                  placeholder="Horas estimadas"
                  name="horasestimadas"
                  onChange={formik.handleChange("horasestimadas")}
                  onBlur={formik.handleBlur("horasestimadas")}
                  value={formik.values.horasestimadas}
                  disabled={disabledInputs === true ? true : false}
                />
                <label htmlFor="horasestimadas">Horas estimadas</label>
                <div className="error">
                  {formik.touched.horasestimadas && formik.errors.horasestimadas}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemProjetos;
