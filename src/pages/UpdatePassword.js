import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage, updatePassword } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  password: Yup.string().required("A senha atual é obrigatória!"),
  newPassword: Yup.string().required("A nova senha é obrigatória!").min(8, "A senha deve ter no mínimo 8 caracteres"),
  confirmPassword: Yup.string().required("A confirmação de senha é obrigatória!").oneOf([Yup.ref('newPassword')], "As senhas não coincidem"),
});


const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordErr, setPasswordErr] = useState(false);
  const authState = useSelector((state) => state.auth);
  const {isError, isSuccess, isLoading, message} = authState;
  

  useEffect(() => {
    if(message === "Senha incorreta") setPasswordErr(true)
    if(isSuccess && message === "Senha atualizada com sucesso") {
      toast.success("Senha alterada com sucesso")
      setTimeout(() => {
        navigate("admin")
        dispatch(resetMessage())
      }, 1500);
    }
  },[message, isError, isSuccess])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updatePassword({password: values.password, newPassword: values.newPassword}))
    },
  });

  return (
    <div className="justify-content-center d-flex">
      <div className="d-flex align-items-center updatePassword">
        <div className="text-center updatePassword__title mb-4">
          <h5 className="mt-3">Trocar Senha</h5>
          <p className="">Crie uma senha nova com pelo menos 8 caracteres</p>
        </div>
        <div className="updatePassword__inputs">
          <form onSubmit={formik.handleSubmit}>
            <div class="col">
              <div class="mb-3 input">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Senha Atual"
                  aria-label="Senha Atual"
                  name="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password &&
                    formik.errors.password}
                  {passwordErr ? "Senha incorreta" : ""}
                </div>
              </div>
              <div class="mb-3 input">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Nova senha"
                  aria-label="Nova Senha"
                  name="newPassword"
                  onChange={formik.handleChange("newPassword")}
                  onBlur={formik.handleBlur("newPassword")}
                />
                <div className="error">
                  {formik.touched.newPassword &&
                    formik.errors.newPassword}
                </div>
              </div>
              <div class="input">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Confirmar senha"
                  aria-label="Confirmar Senha"
                  name="confirmPassword"
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                />
              </div>
              <div className="error mb-2">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </div>
            </div>
            <span className="">Esqueceu a senha?</span>
            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-primary">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
