import React, { useState } from "react";
import { Table, Modal, Space, Input } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { IMaskInput } from "react-imask";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { HiViewGridAdd } from "react-icons/hi";
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingAssoc, setConfirmLoadingAssoc] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };
  const showModalAssoc = () => {
    setOpenAssoc(true);
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
  const handleOkAssoc = () => {
    alert("O Augusto quer ser Homem");
    setConfirmLoadingAssoc(true);
    setTimeout(() => {
      setOpenAssoc(false);
      setConfirmLoadingAssoc(false);
    }, 2000);
  };
  const handleCancelAssoc = () => {
    console.log("Clicked cancel button");
    setOpenAssoc(false);
  };
  const apontamentos = (e) => {
    navigate(`apontamentos/${e.key}`)
  }
  const data1 = [];
  for (let i = 0; i < 25; i++) {
    data1.push({
      key: i + 1,
      nome: `Alisson Rhuan`,
      cpf: "081.013.301-60",
      telefone: `58445484`,
      empresa: "Alisson LTDA",
      acoes: (
        <>
          <button className="bg-transparent border-0 text-blue">
            <GrFormView className="fs-4" />
          </button>
          <button
            className="bg-transparent border-0 text-blue"
            onClick={showModalAssoc}
          >
            <HiViewGridAdd className="fs-5" />
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
                onClick={showModal}
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
                apontamentos(record)
              },
            };
          }}
          columns={columns}
          dataSource={data1}
          rowClassName="custom-table-row"
        />
        <Modal
          title="Cadastro de Funcionários"
          onCancel={handleCancel}
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          maskClosable={false}
          width={"75%"}
          styles={{
            body: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
          }}
        >
          <form>
            <h4 className="border-bottom">Dados do Funcionário</h4>
            <div className="mb-3 d-flex gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  type="text"
                  className="form-control formInput"
                  id="cpf"
                  placeholder="nome"
                />
                <label htmlFor="nome">Nome</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  type="date"
                  className="form-control formInput"
                  id="datanascimento"
                />
                <label htmlFor="datanascimento">Data de Nascimento</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  mask="000.000.000-00"
                  id="cpf"
                  placeholder="cpf"
                />
                <label htmlFor="cpf">CPF</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="rg"
                  placeholder="rg"
                />
                <label htmlFor="rg">RG</label>
              </div>
              <div className="form-floating w-100">
                <IMaskInput
                  className="form-control formInput"
                  mask="(00) 0 0000-0000"
                  id="telefone"
                  placeholder="telefone"
                />
                <label htmlFor="telefone">Telefone</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
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
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="cidade"
                  name="cidade"
                >
                  <option selected>Cidade</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="uf"
                  name="uf"
                >
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
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="date"
                  id="dataadmissao"
                  placeholder="Data de Admissão"
                />
                <label htmlFor="dataadmissao">Data de Admissão</label>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="valorremuneracao"
                  placeholder="Remuneração R$"
                />
                <label htmlFor="valorremuneracao">Remuneração R$</label>
              </div>
              <div className="form-floating w-50">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="valorhoraextra"
                  placeholder="Hora Extra R$"
                />
                <label htmlFor="valorhoraextra">Hora Extra R$</label>
              </div>
            </div>
            <h4 className="border-bottom">Informações Bancarias</h4>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-50">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="banco"
                  name="banco"
                >
                  <option selected>Banco</option>
                  <option value="1">Itaú</option>
                  <option value="2">Santander</option>
                  <option value="3">Banco do Brasil</option>
                </select>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  value="002"
                  disabled
                  id="numerobanco"
                  placeholder="Numero do Banco"
                />
                <label htmlFor="numerobanco">Numero do Banco</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="agencia"
                  placeholder="Agência"
                />
                <label htmlFor="agencia">Agência</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  type="number"
                  id="conta"
                  placeholder="Conta"
                />
                <label htmlFor="conta">Conta</label>
              </div>
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="tipoconta"
                  name="tipoconta"
                >
                  <option selected>Tipo da Conta</option>
                  <option value="1">Corrente</option>
                  <option value="2">Poupança</option>
                  <option value="3">Salário</option>
                </select>
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-75">
                <IMaskInput
                  className="form-control formInput"
                  type="text"
                  id="pix"
                  placeholder="Pix"
                />
                <label htmlFor="pix">Pix</label>
              </div>
              <div className="form-floating w-25">
                <select
                  class="form-select formInput"
                  aria-label="Default select example"
                  id="tipopix"
                  name="tipopix"
                >
                  <option selected>Tipo da Chave Pix</option>
                  <option value="1">Telefone</option>
                  <option value="2">Aleatória</option>
                  <option value="3">Cpf</option>
                  <option value="3">Email</option>
                </select>
              </div>
            </div>
            <h4 className="border-bottom">Outros Dados</h4>
            <div className="d-flex mb-3 gap-2">
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  mask="00:00 - 00:00"
                  id="horario1"
                  placeholder="Horário Manhã"
                />
                <label htmlFor="horario1">Horário Manhã</label>
              </div>
              <div className="form-floating w-25">
                <IMaskInput
                  className="form-control formInput"
                  mask="00:00 - 00:00"
                  id="horario2"
                  placeholder="Horário Tarde"
                />
                <label htmlFor="horario2">Horário Tarde</label>
              </div>
              <div className="form-floating w-50">
                <Space direction="vertical" />
                <Input.Password
                  className="formInput"
                  id="password"
                  placeholder="Senha de Acesso"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
            </div>
            <div className="d-flex mb-3 gap-2">
              <div class="form-floating w-100">
                <textarea
                  class="form-control"
                  placeholder="Insira as Observações"
                  id="observacoes"
                  style={{ height: "100px", resize: "none" }}
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
                  <h5 className="text-center">Manuel da Silva</h5>
                </div>
              </div>
            </div>
            <br />
            <div className="tabelaAssoc_linhas w-100 ">
                <div className="d-flex">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75">
                    <h6 className="text-projetos">Apostas esportivas</h6>
                  </div>
                  <div className="fs-5"><span style={{cursor: "pointer"}}>[    ]</span></div>
                </div>
            </div>
            <div style={{borderTop: "1px solid transparent"}} className="tabelaAssoc_linhas w-100 ">
                <div className="d-flex">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75">
                    <h6 className="text-projetos">Nota Fiscal Eletrônica</h6>
                  </div>
                  <div className="fs-5"><span style={{cursor: "pointer"}}>[    ]</span></div>
                </div>
            </div>
            <div style={{borderTop: "1px solid transparent"}} className="tabelaAssoc_linhas w-100 ">
                <div className="d-flex">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75">
                    <h6 className="text-projetos">Ecommerce</h6>
                  </div>
                  <div className="fs-5"><span style={{cursor: "pointer"}}>[    ]</span></div>
                </div>
            </div>
            <div style={{borderTop: "1px solid transparent"}} className="tabelaAssoc_linhas w-100 ">
                <div className="d-flex">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75">
                    <h6 className="text-projetos">Streaming</h6>
                  </div>
                  <div className="fs-5"><span style={{cursor: "pointer"}}>[    ]</span></div>
                </div>
            </div>
            <div style={{borderTop: "1px solid transparent"}} className="tabelaAssoc_linhas w-100 ">
                <div className="d-flex">
                  <div className="linha">
                    <h5 className="fs-5 me-5 mt-1">Projeto</h5>
                  </div>
                  <div className="w-75">
                    <h6 className="text-projetos">Ponto Eletrônico</h6>
                  </div>
                  <div className="fs-5"><span style={{cursor: "pointer"}}>[    ]</span></div>
                </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ListagemFuncionarios;
