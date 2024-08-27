import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserfromLocalStorage,
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

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
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
      });
  },
});

export default authSlice.reducer;
