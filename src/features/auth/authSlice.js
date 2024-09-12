import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
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

export const createFuncionario = createAsyncThunk(
  "/auth/create-funcionario",
  async (data,thunkAPI) => {
    try {
      return await authService.createFuncionario(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateFuncionario = createAsyncThunk(
  "/auth/update-funcionario",
  async (data,thunkAPI) => {
    try {
      return await authService.updateFuncionario(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const associarProjeto = createAsyncThunk(
  "/auth/associar-funcionario-projeto",
  async (data,{rejectWithValue}) => {
    try {
      return await authService.associarFuncionarioProjeto(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const desassociarProjeto = createAsyncThunk(
  "/auth/desassociar-funcionario-projeto",
  async (data,{rejectWithValue}) => {
    try {
      return await authService.desassociarFuncionarioProjeto(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteFuncionario = createAsyncThunk(
  "/auth/delete-funcionario",
  async (id,thunkAPI) => {
    try {
      return await authService.deleteFuncionario(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerPontoFuncionario = createAsyncThunk(
  "/auth/registrar-ponto-funcionario",
  async (data,{rejectWithValue}) => {
    try {
      return await authService.registerPonto(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetState = createAction("Reset_all");

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
        state.assoc = action.payload;
        state.message = "Associado com Sucesso"
      })
      .addCase(associarProjeto.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.payload || action.error.message;
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
        state.desassoc = action.payload;
        state.message = "Desassociado com Sucesso"
      })
      .addCase(desassociarProjeto.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.payload || action.error.message;
      })
      .addCase(createFuncionario.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFuncionario.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.createdFuncionario = action.payload;
        state.message = "Funcionario criado com Sucesso"
      })
      .addCase(createFuncionario.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(updateFuncionario.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFuncionario.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.updatedFuncionario = action.payload;
        state.message = "Funcionario atualizado com Sucesso"
      })
      .addCase(updateFuncionario.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(deleteFuncionario.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFuncionario.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.deletedFuncionario = action.payload;
        state.message = "Funcionario deletado com Sucesso"
      })
      .addCase(deleteFuncionario.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.error;
      })
      .addCase(registerPontoFuncionario.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerPontoFuncionario.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isError = false;
        // eslint-disable-next-line no-unused-expressions
        state.isSuccess = true,
        state.message = "Ponto registrado com Sucesso"
      })
      .addCase(registerPontoFuncionario.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        state.isLoading = false,
        state.isSuccess = false,
        state.isError = true,
        state.message = action.payload || action.error.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
