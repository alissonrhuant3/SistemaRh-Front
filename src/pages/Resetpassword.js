import React from "react";
import { Input } from "antd";
import CustomInput from "../components/CustomInput";

const Resetpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Resetar Senha</h3>
        <p className="text-center">Insira sua nova senha. </p>
        <form action="">
          <CustomInput type="password" label="Nova Senha" id="pass" />
          <CustomInput type="password" label="Confirmar Senha" id="confirmpass" />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Resetar Senha
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
