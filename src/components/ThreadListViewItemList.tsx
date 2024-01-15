import thumbUpLogo from "../assets/icon/thumb-up.svg";
import thumbDownLogo from "../assets/icon/thumb-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { IThreadListComponentState } from "../models/component/thread-list.component";
import { dateStringFormatter } from "../utils/dateStringFormatter";
import { Link } from "react-router-dom";
import { IThreadDetailComponentState } from "../models/component/thread-detail.component";
import { resetThreadDetail } from "../reducers/threadDetailReducer";
import { AppDispatch } from "../config/store";

const ThreadListViewItemList = () => {
  const dispatch: AppDispatch = useDispatch();

  const threadDetailIdState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail._id;
    }
  );

  const threadItemListState = useSelector(
    ({ threadList }: { threadList: IThreadListComponentState }) => {
      return threadList;
    }
  );

  return (
    <div className="flex flex-col mt-10 mb-10 md:mb-0 w-full">
      {threadItemListState.threads.map((thread) => {
        return (
          <div
            key={thread._id}
            className="relative px-6 py-3 border-b-2 border-black-500"
          >
            <div className="pb-1 flex gap-2 items-center">
              <span className="text-blue-600">{thread.username}</span>
              <span className="text-xs">
                {dateStringFormatter(thread.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <img
                  src={thread.vote >= 0 ? thumbUpLogo : thumbDownLogo}
                  className="h-4 w-4"
                  alt="arrow"
                  width="40px"
                  height="40px"
                />
                <span className="text-xs">{thread.vote}</span>
              </span>
            </div>
            <span className="max-h-24 overflow-hidden break-words">
              {thread.title}
            </span>
            <Link
              className={`absolute top-0 left-0 w-full h-full hover:bg-blue-900/10 ${
                thread._id === threadDetailIdState
                  ? "bg-blue-900/30 pointer-events-none"
                  : ""
              }`}
              to={`/topic/${
                threadItemListState.selectedTopic?._id ?? "latest"
              }/thread/${thread._id}`}
              onClick={() => dispatch(resetThreadDetail())}
            ></Link>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadListViewItemList;
