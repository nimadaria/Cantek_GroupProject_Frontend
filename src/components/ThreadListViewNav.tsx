import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../config/store";
import { menuNegateActive } from "../reducers/menuReducer";
import hamburgerLogo from "../assets/icon/hamburger.svg";
import refreshLogo from "../assets/icon/refresh.svg";
import addPostLogo from "../assets/icon/add-post.svg";
import beerCanLogo from "../assets/icon/can-of-beer.svg";
import { IThreadListComponentState } from "../models/component/thread-list.component";
import { useMatch } from "react-router-dom";
import { initializeThreadList } from "../reducers/threadListReducer";
import { initializeContentForm } from "../reducers/ContentFormReducer";
import { ContentCreationFormType } from "../constants/ContentCreationFormType";

const ThreadListViewNav = () => {
  const dispatch: AppDispatch = useDispatch();

  const match = useMatch("/topic/:topicId/*");
  const topicId = match?.params.topicId
    ? String(match.params.topicId)
    : "latest";

  const threadListState = useSelector(
    ({ threadList }: { threadList: IThreadListComponentState }) => {
      return threadList;
    }
  );

  return (
    <div className="top-0 h-10 w-full fixed bg-white text-white z-10 md:w-1/2 lg:w-1/3">
      <div className="flex bg-gray-900/95 items-center">
        <div
          className="p-2 cursor-pointer hover:bg-gray-700 hidden md:block"
          onClick={() => dispatch(menuNegateActive())}
        >
          <div className="flex">
            <img
              src={hamburgerLogo}
              className="h-8 w-8"
              alt="arrow"
              width="40px"
              height="40px"
            />

            <img
              src={beerCanLogo}
              className="h-8 w-8"
              alt="arrow"
              width="40px"
              height="40px"
            />
          </div>
        </div>
        <div className="flex items-center p-2 h-10 grow">
          <h1 className="w-10 grow text-center text-ellipsis overflow-hidden whitespace-nowrap">
            {threadListState.selectedTopic?._id
              ? threadListState.selectedTopic.title
              : "Latest Threads"}
          </h1>
        </div>
        <div
          className="p-2 cursor-pointer hover:bg-gray-700 hidden md:block"
          onClick={() => dispatch(initializeThreadList(topicId))}
        >
          <div className="flex">
            <img
              src={refreshLogo}
              className="h-7 w-7"
              alt="arrow"
              width="40px"
              height="40px"
            />
          </div>
        </div>

        {topicId !== "latest" && (
          <div
            className="p-2 cursor-pointer hover:bg-gray-700 hidden md:block"
            onClick={() =>
              dispatch(
                initializeContentForm({
                  type: ContentCreationFormType.Thread,
                  itemId: { topicId },
                  formDisplayTitle: threadListState.selectedTopic.title,
                })
              )
            }
          >
            <div className="flex">
              <img
                src={addPostLogo}
                className="h-7 w-7"
                alt="arrow"
                width="40px"
                height="40px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadListViewNav;
