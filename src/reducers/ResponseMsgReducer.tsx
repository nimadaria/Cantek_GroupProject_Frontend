import { createSlice } from "@reduxjs/toolkit";
import { IResponseResultMessageState } from "../models/component/responseMsg.component";

const responseMsgSlice = createSlice({
  name: "responseResultMessage",
  initialState: {
    isActive: false,
    isSuccess: false,
    message: "",
  } as IResponseResultMessageState,
  reducers: {
    hideResponseMsg() {
      return {
        isActive: false,
        isSuccess: false,
        message: "",
      };
    },
    showResponseMsg(_, action) {
      return {
        isActive: true,
        isSuccess: action.payload.isSuccess,
        message: action.payload.message,
      };
    },
  },
});

export const { hideResponseMsg, showResponseMsg } = responseMsgSlice.actions;

export default responseMsgSlice.reducer;
