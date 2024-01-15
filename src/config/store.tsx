import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../reducers/menuReducer";
import threadListReducer from "../reducers/threadListReducer";
import threadDetailReducer from "../reducers/threadDetailReducer";
import ContentFormReducer from "../reducers/ContentFormReducer";
import responseMsgReducer from "../reducers/ResponseMsgReducer";
import UserFormReducer from "../reducers/UserFormReducer";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    userForm: UserFormReducer,
    threadList: threadListReducer,
    threadDetail: threadDetailReducer,
    contentForm: ContentFormReducer,
    responseMsg: responseMsgReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
