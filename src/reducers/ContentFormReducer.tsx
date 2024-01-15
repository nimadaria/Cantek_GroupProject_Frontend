import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IContentCreationForm } from "../models/component/contentCreationForm.component";
import threadService from "../services/threadService";

const contentFormSlice = createSlice({
  name: "contentCreationForm",
  initialState: {
    isActive: false,
    type: "",
    itemId: {},
    formDisplayTitle: "",
    formDisplayContent: "",
  } as IContentCreationForm,
  reducers: {
    contentFormNegateActive(state) {
      return { ...state, isActive: !state.isActive };
    },
    setContentFormData(state, action) {
      return {
        ...state,
        type: action.payload.type,
        itemId: action.payload.itemId,
        formDisplayTitle: action.payload.formDisplayTitle,
        formDisplayContent: action.payload.formDisplayContent,
      };
    },
    resetFormData(state) {
      return {
        ...state,
        type: "",
        itemId: {},
        formDisplayTitle: "",
        formDisplayContent: "",
      };
    },
  },
});

export const { contentFormNegateActive, setContentFormData, resetFormData } =
  contentFormSlice.actions;

export const initializeContentForm = ({
  type,
  itemId,
  formDisplayTitle,
  formDisplayContent,
}: {
  type: string;
  itemId: { topicId?: string; threadId?: string; commentId?: string };
  formDisplayTitle: string;
  formDisplayContent?: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(resetFormData());
    dispatch(
      setContentFormData({ type, itemId, formDisplayTitle, formDisplayContent })
    );
    dispatch(contentFormNegateActive());
  };
};

export const createThreadContent = ({
  topicId,
  title,
  content,
}: {
  topicId: string;
  title: string;
  content: string;
}) => {
  return async (dispatch: Dispatch) => {
    await threadService.createThread({ topicId, title, content });
    dispatch(resetFormData());
    dispatch(contentFormNegateActive());
  };
};

export const createCommentContent = ({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) => {
  return async (dispatch: Dispatch) => {
    await threadService.createThreadComment({ threadId, content });
    dispatch(resetFormData());
    dispatch(contentFormNegateActive());
  };
};

export const createReplyCommentContent = ({
  threadId,
  commentId,
  content,
}: {
  threadId: string;
  commentId: string;
  content: string;
}) => {
  return async (dispatch: Dispatch) => {
    await threadService.createThreadReplyComment({
      threadId,
      commentId,
      content,
    });
    dispatch(resetFormData());
    dispatch(contentFormNegateActive());
  };
};

export default contentFormSlice.reducer;
