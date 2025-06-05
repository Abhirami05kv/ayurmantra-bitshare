import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  createdAt: string;
};

type UserState = {
  user: User | null;
};


const getUserFromCookies = (): User | null => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};
const initialState: UserState = {
  user: getUserFromCookies(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
