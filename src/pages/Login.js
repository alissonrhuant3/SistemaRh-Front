import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { login } from "../features/auth/authSlice";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";

const Login = () => {
  const dispatch = useDispatch();
  let schema = Yup.object().shape({
    cpf: Yup.string().required("Cpf é Requerido!"),
    password: Yup.string().required("Senha é Requerido!"),
  });
 
  const formik = useFormik({
    initialValues: {
      cpf: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values))
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.replace("https://sitemahr.netlify.app/admin");
    }
  }, []);

   useEffect(() => {
     if(isSuccess) {
       window.location.replace("https://sitemahr.netlify.app/admin");
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
          <div className="form-floating">
          <IMaskInput className="form-control"
          type="text"
            label="Cpf"
            id="cpf"
            name="cpf"
            value={formik.values.cpf}
            onChange={formik.handleChange("cpf")}
            onBlur={formik.handleBlur("cpf")}
          />
          <label htmlFor="cpf">CPF|EMAIL</label>
          </div>
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
