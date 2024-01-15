import ThreadListViewNav from "./ThreadListViewNav";
import ThreadListViewItemList from "./ThreadListViewItemList";
import { AppDispatch } from "../config/store";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import {
  initializeThreadList,
  loadNextThreadPage,
} from "../reducers/threadListReducer";
import { useEffect } from "react";
import ThreadListViewFooter from "./ThreadListViewFooter";
import { isScrollReachBottom } from "../utils/htmlScrollEventDetector";
import { IThreadListComponentState } from "../models/component/thread-list.component";
import { IThreadDetailComponentState } from "../models/component/thread-detail.component";

const ThreadListView = () => {
  const dispatch: AppDispatch = useDispatch();

  const match = useMatch("/topic/:topicId/*");
  const pathTopicId = match?.params.topicId
    ? String(match.params.topicId)
    : "latest";

  useEffect(() => {
    dispatch(initializeThreadList(pathTopicId));
  }, [dispatch, pathTopicId]);

  const threadDetailIdState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail._id;
    }
  );

  const threadItemListState = useSelector(
    ({ threadList }: { threadList: IThreadListComponentState }) => {
      return threadList.threads;
    }
  );

  const reachLastThreadState = useSelector(
    ({ threadList }: { threadList: IThreadListComponentState }) => {
      return threadList.isReachEnd;
    }
  );

  const onScrollThreadListEvent = (e: React.UIEvent<HTMLElement>) => {
    if (isScrollReachBottom(e)) {
      const lastLoadedThread =
        threadItemListState[threadItemListState.length - 1];

      if (threadItemListState.length > 0 && match && !reachLastThreadState)
        dispatch(
          loadNextThreadPage(String(match.params.topicId), lastLoadedThread._id)
        );
    }
  };

  return (
    <div
      className={`${
        threadDetailIdState === "" ? "block" : "hidden md:block"
      } h-screen min-w-full md:min-w-[30%] md:w-1/2 lg:w-1/3 overflow-y-scroll`}
      onScroll={(e) => onScrollThreadListEvent(e)}
    >
      <ThreadListViewNav />
      <ThreadListViewItemList />
      <ThreadListViewFooter />
    </div>
  );
};

export default ThreadListView;
