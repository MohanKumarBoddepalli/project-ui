import { createSlice } from "@reduxjs/toolkit";

interface userSlice {
  userId: number;
  userName: string;
}

const initialState: userSlice = {
  userId: 0,
  userName: 'mohan'
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId += action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

// user
export default userSlice.reducer;