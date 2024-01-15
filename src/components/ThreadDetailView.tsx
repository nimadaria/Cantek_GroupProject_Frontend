import ThreadDetailViewCommentList from "./ThreadDetailViewCommentList";
import { AppDispatch } from "../config/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { appendCommentPage } from "../reducers/threadDetailReducer";
import ThreadDetailViewNav from "./ThreadDetailViewNav";
import { useParams } from "react-router-dom";
import { isScrollReachBottom } from "../utils/htmlScrollEventDetector";
import { IThreadDetailComponentState } from "../models/component/thread-detail.component";

const ThreadDetailView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { thread: threadId, pageNumber } = useParams();

  useEffect(() => {
    if (threadId) {
      if (!pageNumber) dispatch(appendCommentPage(threadId, 1));
      else dispatch(appendCommentPage(threadId, Number(pageNumber)));
    }
  }, [dispatch, threadId, pageNumber]);

  const threadDetailPages = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.pages;
    }
  );

  const reachLastCommentState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail.isReachEnd;
    }
  );

  const onScrollCommentsNextPageEvent = (e: React.UIEvent<HTMLElement>) => {
    if (isScrollReachBottom(e)) {
      if (!reachLastCommentState && threadId) {
        dispatch(
          appendCommentPage(
            threadId,
            threadDetailPages[threadDetailPages.length - 1].pageNumber + 1
          )
        );
      }
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-y-scroll md:border-solid md:border-l md:border-gray min-w-full md:min-w-[30%] md:w-1/2 lg:w-2/3"
      onScroll={(e) => onScrollCommentsNextPageEvent(e)}
    >
      <ThreadDetailViewNav />
      <ThreadDetailViewCommentList />
    </div>
  );
};

export default ThreadDetailView;
