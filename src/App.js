import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ListagemEmpresas from "./pages/ListagemEmpresas";
import ListagemFuncionarios from "./pages/ListagemFuncionarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}/>
          <Route path="empresas" element={<ListagemEmpresas />}/>
          <Route path="funcionarios" element={<ListagemFuncionarios />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
