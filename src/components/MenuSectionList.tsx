import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMenuComponentState } from "../models/component/menu.component";
import { ISection } from "../models/api/section.api.interface";
import { ITopic } from "../models/api/topic.api.interface";
import { IThreadListComponentState } from "../models/component/thread-list.component";
import { resetThreadDetail } from "../reducers/threadDetailReducer";
import { AppDispatch } from "../config/store";
import { menuNegateActive } from "../reducers/menuReducer";

const MenuSectionList = () => {
  const dispatch: AppDispatch = useDispatch();

  const menuListState = useSelector(
    ({ menu }: { menu: IMenuComponentState }) => {
      return menu.sections;
    }
  );

  const threadListTopicState = useSelector(
    ({ threadList }: { threadList: IThreadListComponentState }) => {
      return threadList.selectedTopic;
    }
  );

  return (
    <div className="mt-16 h-[calc(100%-7rem)] overflow-y-scroll">
      <div className="grid grid-cols-2 p-4">
        <Link
          className={`text-lg pl-2 ${
            threadListTopicState?._id
              ? "text-white"
              : "text-amber-300 pointer-events-none"
          }`}
          to={`/topic/latest`}
          onClick={() => {
            dispatch(resetThreadDetail());
            dispatch(menuNegateActive());
          }}
        >
          Latest Threads
        </Link>
      </div>

      {menuListState ? (
        menuListState.map((section: ISection) => {
          return (
            <div key={section._id} className="grid grid-cols-2 p-4 text-white">
              <div className="text-sm col-span-2 text-stone-400 pb-2">
                {section.title}
              </div>
              {section.topics.map((topic: ITopic) => {
                return (
                  <Link
                    key={topic._id}
                    className={`text-lg pl-2 pb-2 ${
                      threadListTopicState?._id === topic._id
                        ? "text-amber-300 pointer-events-none"
                        : "text-white"
                    }`}
                    to={`/topic/${topic._id}`}
                    onClick={() => {
                      dispatch(resetThreadDetail());
                      dispatch(menuNegateActive());
                    }}
                  >
                    {topic.title}
                  </Link>
                );
              })}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default MenuSectionList;
