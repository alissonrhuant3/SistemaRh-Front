import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
  funcionarios: [],
  funcprojetos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk(
  "/auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFuncionarios = createAsyncThunk(
  "/auth/get-funcionarios",
  async (thunkAPI) => {
    try {
      return await authService.getAllFuncionarios();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFuncionariosEmpresa = createAsyncThunk(
  "/auth/get-funcemp",
  async (thunkAPI) => {
    try {
      return await authService.getAllFuncionariosEmpresa();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllFuncionariosProjetos = createAsyncThunk(
  "/auth/get-funcionarios-projetos",
  async (id,thunkAPI) => {
    try {
      return await authService.getAllFuncionarioProjetos(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const associarProjeto = createAsyncThunk(
  "/auth/associar-funcionario-projeto",
  async (data,thunkAPI) => {
    try {
      return await authService.associarFuncionarioProjeto(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const desassociarProjeto = createAsyncThunk(
  "/auth/desassociar-funcionario-projeto",
  async (data,thunkAPI) => {
    try {
      return await authService.desassociarFuncionarioProjeto(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Sucesso",
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(getAllFuncionarios.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFuncionarios.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Sucesso",
        state.funcionarios = action.payload;
      })
      .addCase(getAllFuncionarios.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(getAllFuncionariosEmpresa.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFuncionariosEmpresa.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Sucesso",
        state.funcionarios = action.payload;
      })
      .addCase(getAllFuncionariosEmpresa.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(getAllFuncionariosProjetos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFuncionariosProjetos.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "PFS", //Projetos Funcionario Sucesso
        state.funcprojetos = action.payload;
      })
      .addCase(getAllFuncionariosProjetos.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(associarProjeto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(associarProjeto.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Associado com Sucesso"
      })
      .addCase(associarProjeto.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(desassociarProjeto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(desassociarProjeto.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Desassociado com Sucesso"
      })
      .addCase(desassociarProjeto.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
  },
});

export default authSlice.reducer;
