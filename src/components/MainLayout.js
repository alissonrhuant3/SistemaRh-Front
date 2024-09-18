import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  AiOutlineDashboard,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { verifyExpJwtToken, verifyRole } from "../utils/axiosconfig";

const MainLayout = () => {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (verifyExpJwtToken() === false) {
    window.location.replace("http://localhost:3000/");
  } else if (verifyExpJwtToken() === "Usuário não logado") {
    window.location.replace("http://localhost:3000/");
  }

  const roleUser = verifyRole();
  
  const isAdmin = roleUser === "admin";
  const isEmpresaRh = roleUser === "empresa/rh";
  const isGestor = roleUser === "gestor";
  const isFuncionario = roleUser === "funcionario";

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }
  
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">RH</span>
            <span className="lg-logo">RH System</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Inicio",
              hidden: !(isAdmin || isEmpresaRh || isFuncionario || isGestor)
            },
            {
              key: "empresas",
              icon: <FaRegBuilding className="fs-4" />,
              label: "Empresas",
              hidden: !isAdmin
            },
            {
              key: "funcionarios",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Funcionários",
              hidden: !(isAdmin || isEmpresaRh || isGestor)
            },
            {
              key: "projetos",
              icon: <FaClipboardList className="fs-4" />,
              label: "Projetos",
              hidden: !(isAdmin || isEmpresaRh)
            },
          ].filter(item => !item.hidden)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex align-items-center me-4"><h6 className="" onClick={() => logout()}>Sair</h6></div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
