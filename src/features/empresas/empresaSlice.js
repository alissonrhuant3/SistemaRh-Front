import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import empresaService from "./empresaService";

export const getEmpresas = createAsyncThunk(
  "empresa/get-empresas",
  async (thunkAPI) => {
    try {
      return await empresaService.getEmpresas();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  empresas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const empresaSlice = createSlice({
  name: "empresas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getEmpresas.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getEmpresas.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.empresas = action.payload;
      state.message = "Sucesso";
    })
    .addCase(getEmpresas.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
  }
});

export default empresaSlice.reducer;