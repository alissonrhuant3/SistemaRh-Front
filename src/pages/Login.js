import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { login } from "../features/auth/authSlice";
import * as Yup from "yup";


const Login = () => {
  const dispatch = useDispatch();
  let schema = Yup.object().shape({
    cpf: Yup.number().required("Cpf é Requerido!"),
    password: Yup.string().required("Senha é Requerido!"),
  });
  const formik = useFormik({
    initialValues: {
      cpf: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.replace("http://localhost:3000/admin");
    }
  }, []);

   useEffect(() => {
     if(isSuccess) {
       window.location.replace("http://localhost:3000/admin");
     }
   },
   [user, isLoading, isError, isSuccess, message])

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center">Entrar</h3>
        <p className="text-center">Entre em sua conta para continuar</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="number"
            label="Cpf"
            id="cpf"
            name="cpf"
            val={formik.values.cpf}
            onCh={formik.handleChange("cpf")}
            onBl={formik.handleBlur("cpf")}
          />
          <div className="error text-danger mb-3 ms-1">
            {formik.touched.cpf && formik.errors.cpf ? (
              <div>{formik.errors.cpf}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            label="Senha"
            id="pass"
            name="password"
            val={formik.values.password}
            onCh={formik.handleChange("password")}
            onBl={formik.handleBlur("password")}
          />
          <div className="error text-danger mb-4 ms-1">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            {isError && <div>Credenciais inválidas!</div>}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password">Esqueceu sua Senha?</Link>
          </div>
          <button
            to="/admin"
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
