import React, { useEffect } from "react";
import { Table } from "antd";
import { GrFormView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { aprovacaoGestor, getApontamentosFuncionario, getFuncionario } from "../features/auth/authSlice";
import moment from "moment";
import { verifyExpJwtToken } from "../utils/axiosconfig";
import { toast } from "react-toastify";

const Apontamentos = () => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const getFuncID = location.pathname.split("/")[4];
  const funcionarioState = useSelector((state) => state.auth);
  const apontamentos = useSelector((state) => state.auth.apontamentos);

  const aprovarHoraExtra = (e) => {
    if(e.gestor === "Aprovado") {
      toast.info("Este apontamento já foi aprovado!")
    } else {
      dispatch(aprovacaoGestor({apontamentoId: e.id, funcionarioId: getFuncID}))
      setTimeout(() => {
        dispatch(getApontamentosFuncionario(getFuncID))
      }, 300);
    }
    
  }

  if (verifyExpJwtToken() === false) {
    window.location.replace("http://localhost:3000/");
  } else if (verifyExpJwtToken() === "Usuário não logado") {
    window.location.replace("http://localhost:3000/");
  }
  
  useEffect(() => {
    dispatch(getFuncionario(getFuncID))
    dispatch(getApontamentosFuncionario(getFuncID))
  },[])

  const columns = [
    {
      title: "Data",
      dataIndex: "data",
    },
    {
      title: "Dia da Semana",
      dataIndex: "diasemana",
    },
    {
      title: "Projeto",
      dataIndex: "projeto",
    },
    {
      title: "Tarefa",
      dataIndex: "tarefa",
    },
    {
      title: "Hora início",
      dataIndex: "horainicio",
    },
    {
      title: "Hora Fim",
      dataIndex: "horafim",
    },
    {
      title: "Hora início",
      dataIndex: "horainicio2",
    },
    {
      title: "Hora Fim",
      dataIndex: "horafim2",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "HE início",
      dataIndex: "heinicio",
    },
    {
      title: "HE fim",
      dataIndex: "hefim",
    },
    {
      title: "GESTOR",
      dataIndex: "gestor",
      className: "pointer-column",
      onCell: (record, rowIndex) => ({
        onDoubleClick: () => {
          aprovarHoraExtra(record)
        }
      })
    },
  ];

  const data1 = [];
  for (let i = 0; i < apontamentos?.length; i++) {

    const horainicio = apontamentos[i].horainicio ? moment(apontamentos[i].horainicio, 'HH:mm:ss') : null;
    const horafim = apontamentos[i].horafim ? moment(apontamentos[i].horafim, 'HH:mm:ss') : null;
    const horainicio2 = apontamentos[i].horainicio2 ? moment(apontamentos[i].horainicio2, 'HH:mm:ss') : null;
    const horafim2 = apontamentos[i].horafim2 ? moment(apontamentos[i].horafim2, 'HH:mm:ss') : null;

    const total1 = (horainicio && horafim) ? horafim.diff(horainicio, 'hours', true) : 0;
    const total2 = (horainicio2 && horafim2) ? horafim2.diff(horainicio2, 'hours', true) : 0;

  data1.push({
    data: moment(apontamentos[i].data).locale("pt-br").format("L"),
    diasemana: moment(apontamentos[i].data).locale("pt-br").format("dddd"),
    projeto: apontamentos[i].projeto.nome,
    tarefa: apontamentos[i].tarefa,
    horainicio: apontamentos[i].horainicio ? apontamentos[i].horainicio : "00:00" ,
    horafim: apontamentos[i].horafim ? apontamentos[i].horafim : "00:00",
    horainicio2: apontamentos[i].horainicio2 ? apontamentos[i].horainicio2 : "00:00",
    horafim2: apontamentos[i].horafim2 ? apontamentos[i].horafim2 : "00:00",
    total: Math.floor(total1 + total2),
    heinicio: apontamentos[i].heinicio ? apontamentos[i].heinicio : "00:00",
    hefim: apontamentos[i].hefim ? apontamentos[i].hefim : "00:00",
    gestor: apontamentos[i].gestoraprova ? "Aprovado" : "",
    id: apontamentos[i]._id
  });
  } 

  

  return (
    <>
      <div className="tabelaAssoc_linhas w-100 apontamentos">
        <div className="d-flex tabelaAssoc_linhas border-top-0 border-end-0 border-start-0">
          <div className="">
            <h5 className="apontamentosTitle">Funcionário</h5>
          </div>
          <div className="linha ms-2"></div>
          <div className="text-center w-100">
            <h6 className="apontamentosFuncionario">{funcionarioState.funcionario.nome}</h6>
          </div>
          <div>
            <h6 className="apontamentosFuncionario text-danger text-uppercase">{funcionarioState.funcionario.perfil}</h6>
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
          className="tabelaApontamentos"
        />
        </div>
      </div>
    </>
  );
};

export default Apontamentos;
