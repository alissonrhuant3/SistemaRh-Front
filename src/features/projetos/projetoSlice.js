import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projetoService from "./projetoService";

export const getAllProjetos = createAsyncThunk(
  "projeto/get-projetos",
  async (thunkApi) => {
    try {
      return await projetoService.getAllProjetos();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAProjeto = createAsyncThunk(
  "projeto/get-projeto",
  async (id,thunkApi) => {
    try {
      return await projetoService.getAProjeto(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateAProjeto = createAsyncThunk(
  "projeto/update-projeto",
  async (projetoData,thunkApi) => {
    try {
      return await projetoService.updateProjeto(projetoData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createProjetos = createAsyncThunk(
  "projeto/create-projeto",
  async (projetoData, thunkApi) => {
    try {
      return await projetoService.createProjeto(projetoData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProjeto = createAsyncThunk(
  "projeto/delete-projeto",
  async (id, thunkApi) => {
    try {
      return await projetoService.deleteProjeto(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  projetos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const projetoSlice = createSlice({
  name: "projetos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createProjetos.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createProjetos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdProjeto = action.payload;
      state.message = "Sucesso";
    })
    .addCase(createProjetos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(getAProjeto.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAProjeto.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.projetoAtual = action.payload; 
      state.message = "Projeto carregado com sucesso";
    })
    .addCase(getAProjeto.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(getAllProjetos.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getAllProjetos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.projetos = action.payload;
      state.message = "Sucesso";
    })
    .addCase(getAllProjetos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updateAProjeto.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateAProjeto.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedProjeto = action.payload; // Atualiza o projeto modificado
      state.message = "Projeto atualizado com sucesso";
    })
    .addCase(updateAProjeto.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteProjeto.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteProjeto.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedProjeto = action.payload;
      state.message = "Projeto deletado com sucesso";
    })
    .addCase(deleteProjeto.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(resetState, () => initialState);
  }
})

export default projetoSlice.reducer;
