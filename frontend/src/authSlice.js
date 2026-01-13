import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await api.post("/auth/login", data);
    const token = res.data.token;

    localStorage.setItem("token", token);

    const me = await api.get("/auth/me", {
      headers: { token },
    });

    return { token, user: me.data };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
