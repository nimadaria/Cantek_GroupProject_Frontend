import { Dispatch, createSlice } from "@reduxjs/toolkit";
import {
  IThreadDetailComponentPage,
  IThreadDetailComponentState,
} from "../models/component/thread-detail.component";
import threadService from "../services/threadService";
import commentService from "../services/commentService";
import { IThreadDetail } from "../models/api/thread-detail.api.interface";
import { IComment } from "../models/api/comment.api.interface";

const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState: {
    _id: "",
    title: "",
    pages: [] as IThreadDetailComponentPage[],
    totalPage: 0,
    pageSize: 0,
    isReachEnd: false,
  } as IThreadDetailComponentState,
  reducers: {
    setThreadDetail(state, action) {
      const pageObj: IThreadDetail = action.payload.body;
      const pageNumber: number = action.payload.pageNum;

      const result = {
        _id: pageObj._id,
        title: pageObj.title,
        totalPage: pageObj.totalPage,
        pageSize: pageObj.pageSize,
      };

      let newPageList = [] as IThreadDetailComponentPage[];
      const existingPageIndex = state.pages.findIndex(
        (page) => page.pageNumber === pageNumber
      );

      if (existingPageIndex === -1) {
        // new page
        newPageList = state.pages.concat({
          pageNumber,
          comments: pageObj.comments.map(({ ...commentObj }) => {
            return { ...commentObj, ancestorTree: [] };
          }),
        });
      } else {
        const savedPage = state.pages[existingPageIndex];

        // existing page
        const updatedPage = {
          pageNumber,
          comments: pageObj.comments.map(({ ...commentObj }, index) => {
            if (index > savedPage.comments.length - 1)
              return { ...commentObj, ancestorTree: [] };
            else return savedPage.comments[index];
          }),
        };
        newPageList = state.pages.map((page) =>
          page.pageNumber !== pageNumber ? page : updatedPage
        );
      }

      // sort once for display
      newPageList.sort(
        (a: IThreadDetailComponentPage, b: IThreadDetailComponentPage) =>
          a.pageNumber - b.pageNumber
      );

      return {
        ...state,
        ...result,
        pages: newPageList,
      };
    },
    setCommentAncestorDetail(state, action) {
      const {
        pageNum,
        commentId,
        ancestorTree: inputAncestorTree,
      } = action.payload;

      const existingPage = state.pages.find(
        (page) => page.pageNumber === pageNum
      );
      if (existingPage) {
        const existingComment = existingPage.comments.find(
          (comment) => comment._id === commentId
        );
        if (existingComment) {
          const newAncestorTree = [
            ...existingComment.ancestorTree,
            ...inputAncestorTree,
          ];

          const newComment = {
            ...existingComment,
            ancestorTree: newAncestorTree,
          };

          const newPage = {
            ...existingPage,
            comments: existingPage.comments.map((cm) =>
              cm._id === existingComment._id ? newComment : cm
            ),
          };

          const newPageList = state.pages.map((page) =>
            page.pageNumber === existingPage.pageNumber ? newPage : page
          );

          return {
            ...state,
            pages: newPageList,
          };
        }
      }
      return state;
    },
    setCommentVote(state, action) {
      const comment: IComment = action.payload.apiResponse;
      const pageNum: number = action.payload.pageNum;

      const existingPage = state.pages.find(
        (page) => page.pageNumber === pageNum
      );
      if (existingPage) {
        const existingComment = existingPage.comments.find(
          (cm) => cm._id === comment._id
        );
        if (existingComment) {
          const newComment = {
            ...existingComment,
            upvote: comment.upvote,
            downvote: comment.downvote,
          };

          const newPage = {
            ...existingPage,
            comments: existingPage.comments.map((cm) =>
              cm._id === existingComment._id ? newComment : cm
            ),
          };

          const newPageList = state.pages.map((page) =>
            page.pageNumber === existingPage.pageNumber ? newPage : page
          );

          return {
            ...state,
            pages: newPageList,
          };
        }
      }
      return state;
    },
    setIsReachEnd(state, action) {
      return {
        ...state,
        isReachEnd: action.payload.isReachEnd,
      };
    },
    resetThreadDetail() {
      return {
        _id: "",
        title: "",
        pages: [],
        totalPage: 0,
        pageSize: 0,
        isReachEnd: false,
      };
    },
  },
});

export const {
  setThreadDetail,
  resetThreadDetail,
  setIsReachEnd,
  setCommentAncestorDetail,
  setCommentVote,
} = threadDetailSlice.actions;

export const appendCommentPage = (threadId: string, pageNum: number) => {
  return async (dispatch: Dispatch) => {
    const apiResponse = await threadService.getThreadDetail({
      threadId,
      pageNum,
    });
    dispatch(setThreadDetail(apiResponse));
    if (apiResponse.body?.totalPage === pageNum) {
      dispatch(setIsReachEnd({ isReachEnd: true }));
    } else {
      dispatch(setIsReachEnd({ isReachEnd: false }));
    }
  };
};

export const prependCommentPage = (threadId: string, pageNum: number) => {
  return async (dispatch: Dispatch) => {
    const apiResponse = await threadService.getThreadDetail({
      threadId,
      pageNum,
    });
    dispatch(setThreadDetail(apiResponse));
  };
};

export const upvoteComment = (commentId: string, pageNum: number) => {
  return async (dispatch: Dispatch) => {
    const apiResponse = await commentService.upvoteComment({
      commentId,
    });
    dispatch(setCommentVote({ pageNum, apiResponse }));
  };
};

export const downvoteComment = (commentId: string, pageNum: number) => {
  return async (dispatch: Dispatch) => {
    const apiResponse = await commentService.downvoteComment({
      commentId,
    });
    dispatch(setCommentVote({ pageNum, apiResponse }));
  };
};

export const loadCommentAncestor = ({
  pageNum,
  commentId,
  ancestorIds,
}: {
  pageNum: number;
  commentId: string;
  ancestorIds: string[];
}) => {
  return async (dispatch: Dispatch) => {
    const apiResponse = await commentService.getCommentInBatch({
      commentIds: ancestorIds,
    });
    dispatch(
      setCommentAncestorDetail({
        pageNum,
        commentId,
        ancestorTree: apiResponse,
      })
    );
  };
};

export default threadDetailSlice.reducer;
