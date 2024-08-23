import React from "react";
import { Table } from "antd";
import { GrFormView } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

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
  },
];
const data1 = [];
for (let i = 0; i < 25; i++) {
  data1.push({
    data: "7/4/2024",
    diasemana: `Segunda`,
    projeto: "NFE",
    tarefa: `Escrita da EF do SEFAZ`,
    horainicio: "9:00",
    horafim: "11:30",
    horainicio2: "12:30",
    horafim2: "18:00",
    total: "8",
    heinicio: "18:00",
    hefim: "23:00",
    gestor: "X",
  });
}

const Apontamentos = () => {
  return (
    <>
      <div className="tabelaAssoc_linhas w-100 apontamentos">
        <div className="d-flex tabelaAssoc_linhas border-top-0 border-end-0 border-start-0">
          <div className="">
            <h5 className="apontamentosTitle">Funcionário</h5>
          </div>
          <div className="linha ms-2"></div>
          <div className="text-center w-100">
            <h6 className="apontamentosFuncionario">Alisson Rhuan Pereira da Silva</h6>
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
          className="tabelaApontamentos"
        />
        </div>
      </div>
    </>
  );
};

export default Apontamentos;
