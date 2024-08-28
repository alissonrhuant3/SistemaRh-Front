import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import empresaReducer from "../features/empresas/empresaSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    empresa: empresaReducer,
  },
  
});