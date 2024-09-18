import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ListagemEmpresas from "./pages/ListagemEmpresas";
import ListagemFuncionarios from "./pages/ListagemFuncionarios";
import ListagemProjetos from "./pages/ListagemProjetos";
import Apontamentos from "./pages/Apontamentos";
import { PrivateRoutes, AdminRoutes, AdminAndEmpresarhRoutes } from "./routing/PrivateRoutes";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />}/>
          <Route path="empresas" element={<AdminRoutes><ListagemEmpresas /></AdminRoutes>}/>
          <Route path="funcionarios" element={<ListagemFuncionarios />}/>
          <Route path="projetos" element={<AdminAndEmpresarhRoutes><ListagemProjetos /></AdminAndEmpresarhRoutes>}/>
          <Route path="funcionarios/apontamentos/:id" element={<Apontamentos />}/>
          <Route path="updatepassword" element={<UpdatePassword />}/>
        </Route>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
