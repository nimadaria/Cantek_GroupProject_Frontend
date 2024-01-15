import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IThreadListComponentState } from "../models/component/thread-list.component";
import { IThreadListItem } from "../models/api/thread-list.api.interface";
import threadService from "../services/threadService";

const threadListSlice = createSlice({
  name: "threadList",
  initialState: {
    selectedTopic: {},
    threads: [] as IThreadListItem[],
    isReachEnd: false,
  } as IThreadListComponentState,
  reducers: {
    initializeThreadListAndTopic(state, action) {
      return {
        ...state,
        threads: action.payload.threadList,
        selectedTopic: action.payload.selectedTopic,
        isReachEnd: false,
      };
    },
    setIsReachEnd(state, action) {
      return {
        ...state,
        isReachEnd: action.payload.isReachEnd,
      };
    },
    mergeThreadList(state, action) {
      return {
        ...state,
        threads: state.threads.concat(action.payload.threadList),
      };
    },
  },
});

export const { initializeThreadListAndTopic, mergeThreadList, setIsReachEnd } =
  threadListSlice.actions;

export const initializeThreadList = (topic: string) => {
  return async (dispatch: Dispatch) => {
    let apiResponse;
    if (topic === "latest") {
      apiResponse = await threadService.getLatestThreads({});
    } else {
      apiResponse = await threadService.getThreadsByTopic({ topicId: topic });
    }
    dispatch(
      initializeThreadListAndTopic({
        threadList: apiResponse?.threads,
        selectedTopic: apiResponse?.topic,
      })
    );
  };
};

export const loadNextThreadPage = (topic: string, lastThreadId: string) => {
  return async (dispatch: Dispatch) => {
    let apiResponse;
    if (topic === "latest") {
      apiResponse = await threadService.getLatestThreads({ lastThreadId });
    } else {
      apiResponse = await threadService.getThreadsByTopic({
        topicId: topic,
        lastThreadId,
      });
    }

    if (apiResponse && apiResponse.threads.length > 0) {
      dispatch(
        mergeThreadList({
          threadList: apiResponse.threads,
        })
      );

      dispatch(
        setIsReachEnd({
          isReachEnd: false,
        })
      );
    } else {
      dispatch(
        setIsReachEnd({
          isReachEnd: true,
        })
      );
    }
  };
};

export default threadListSlice.reducer;
