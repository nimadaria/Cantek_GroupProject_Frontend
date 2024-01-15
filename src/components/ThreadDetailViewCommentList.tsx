import thumbUpLogo from "../assets/icon/thumb-up.svg";
import thumbDownLogo from "../assets/icon/thumb-down.svg";
import loadListLogo from "../assets/icon/load-list.svg";
import replyLogo from "../assets/icon/reply.svg";
import { IThreadDetailComponentState } from "../models/component/thread-detail.component";
import { useDispatch, useSelector } from "react-redux";
import { dateStringFormatter } from "../utils/dateStringFormatter";
import { useParams } from "react-router-dom";
import f5ButtonLogo from "../assets/img/f5-key.png";
import { AppDispatch } from "../config/store";
import {
  appendCommentPage,
  downvoteComment,
  prependCommentPage,
  upvoteComment,
} from "../reducers/threadDetailReducer";
import { Suspense, lazy } from "react";
import { initializeContentForm } from "../reducers/ContentFormReducer";
import { ContentCreationFormType } from "../constants/ContentCreationFormType";
import { AxiosError } from "axios";
import { showResponseMsg } from "../reducers/ResponseMsgReducer";
const ThreadDetailViewCommentTree = lazy(
  () => import("./ThreadDetailViewCommentTree")
);

const ThreadDetailViewCommentList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { thread: threadId, pageNumber } = useParams();

  const threadDetailTitle = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.title;
    }
  );

  const threadDetailPages = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.pages;
    }
  );

  const threadDetailPageSize = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.pageSize;
    }
  );

  const reachLastCommentState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.isReachEnd;
    }
  );

  const totalCommentPageState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.totalPage;
    }
  );

  const dispatchLoadPrevPage = (currentPageNum: number) => {
    if (threadId) dispatch(prependCommentPage(threadId, currentPageNum - 1));
  };

  const dispatchLoadNextPage = () => {
    const lastPage = threadDetailPages[threadDetailPages.length - 1];
    let targetPageNum = lastPage.pageNumber;

    if (lastPage.comments.length === threadDetailPageSize) {
      targetPageNum = lastPage.pageNumber + 1;
    }

    if (threadId) dispatch(appendCommentPage(threadId, targetPageNum));
  };

  const onClickVoteComment = async (
    commentId: string,
    pageNumber: number,
    type: string
  ) => {
    try {
      if (type === "upvote")
        await dispatch(upvoteComment(commentId, pageNumber));
      else if (type === "downvote")
        await dispatch(downvoteComment(commentId, pageNumber));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          showResponseMsg({
            isSuccess: false,
            message: error.response?.data.errorCode,
          })
        );
      } else {
        dispatch(
          showResponseMsg({
            isSuccess: false,
            message: "UNKNOWN_ERROR",
          })
        );
      }
    }
  };

  return (
    <div className="flex flex-col mt-12 mb-10 md:mb-0">
      {threadDetailPages.map((page) => {
        return (
          <div key={`${threadId}-${page.pageNumber}`}>
            <div className="flex w-full text-center py-1 bg-slate-200 items-center justify-center">
              {pageNumber &&
                page.pageNumber !== 1 &&
                threadDetailPages.findIndex(
                  (pageItem) => pageItem.pageNumber === page.pageNumber - 1
                ) === -1 && (
                  <div onClick={() => dispatchLoadPrevPage(page.pageNumber)}>
                    <img
                      src={loadListLogo}
                      className="ml-2 h-7 w-7 cursor-pointer hover:invert-[.5]"
                      alt="arrow"
                      width="40px"
                      height="40px"
                    />
                  </div>
                )}
              <h1 className="grow">Page {page.pageNumber}</h1>
            </div>
            <div>
              {page.comments.map((comment) => {
                return (
                  <div
                    key={comment._id}
                    className="relative px-6 py-3 border-b-2 border-black-500"
                  >
                    <div className="pb-1 flex gap-2 items-center">
                      <span className="text-blue-600 cursor-pointer hover:underline">
                        {comment.author}
                      </span>
                      <span className="text-xs">
                        {dateStringFormatter(comment.createdAt)}
                      </span>
                      <img
                        src={replyLogo}
                        className="h-4 w-4 ml-auto cursor-pointer hover:invert-[.5]"
                        alt="arrow"
                        width="40px"
                        height="40px"
                        onClick={() =>
                          dispatch(
                            initializeContentForm({
                              type: ContentCreationFormType.ReplyComment,
                              itemId: { threadId, commentId: comment._id },
                              formDisplayTitle: threadDetailTitle,
                              formDisplayContent: comment.content,
                            })
                          )
                        }
                      />
                    </div>
                    <Suspense
                      fallback={
                        <>
                          <p>Loading</p>
                        </>
                      }
                    >
                      <ThreadDetailViewCommentTree
                        data={comment}
                        pageNum={page.pageNumber}
                      />
                    </Suspense>
                    <span className="max-h-24 overflow-hidden break-words">
                      {comment.content}
                    </span>
                    <div className="flex gap-2">
                      <div className="flex w-max mt-3 p-2 gap-3 border border-black border-solid rounded">
                        <div
                          className="flex gap-1 items-center"
                          onClick={() =>
                            onClickVoteComment(
                              comment._id,
                              page.pageNumber,
                              "upvote"
                            )
                          }
                        >
                          <img
                            src={thumbUpLogo}
                            className="h-3 w-3 cursor-pointer hover:invert-[.5]"
                            alt="arrow"
                          />
                          <span className="text-xs">{comment.upvote}</span>
                        </div>
                        <div
                          className="flex gap-1 items-center"
                          onClick={() =>
                            onClickVoteComment(
                              comment._id,
                              page.pageNumber,
                              "downvote"
                            )
                          }
                        >
                          <img
                            src={thumbDownLogo}
                            className="h-3 w-3 cursor-pointer hover:invert-[.5]"
                            alt="arrow"
                          />
                          <span className="text-xs">{comment.downvote}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {reachLastCommentState &&
              totalCommentPageState === page.pageNumber && (
                <div
                  className="p-3 flex justify-center"
                  onClick={() => dispatchLoadNextPage()}
                >
                  <img
                    className="hover:scale-110 transition duration-200 cursor-pointer"
                    src={f5ButtonLogo}
                    alt="F5 Key"
                    height="60rem"
                    width="60rem"
                  />
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default ThreadDetailViewCommentList;
