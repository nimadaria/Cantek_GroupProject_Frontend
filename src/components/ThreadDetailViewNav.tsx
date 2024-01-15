import addCommentLogo from "../assets/icon/comment-add.svg";
import elevatorLogo from "../assets/icon/elevator.svg";
import arrowLeftLogo from "../assets/icon/arrow-left.svg";
import { useDispatch, useSelector } from "react-redux";
import { IThreadDetailComponentState } from "../models/component/thread-detail.component";
import { AppDispatch } from "../config/store";
import { resetThreadDetail } from "../reducers/threadDetailReducer";
import { Link, useParams } from "react-router-dom";
import { initializeContentForm } from "../reducers/ContentFormReducer";
import { ContentCreationFormType } from "../constants/ContentCreationFormType";

const ThreadDetailViewNav = () => {
  const dispatch: AppDispatch = useDispatch();

  const threadDetailViewState = useSelector(
    ({ threadDetail }: { threadDetail: IThreadDetailComponentState }) => {
      return threadDetail;
    }
  );

  const params = useParams();

  return (
    <div className="top-0 h-10 z-20 w-full fixed bg-white text-white md:w-1/2 lg:w-2/3">
      <div className="flex bg-gray-900/95 items-center">
        <div className="p-2 cursor-pointer hover:bg-gray-700 md:hidden">
          <Link
            to={`/topic/${params.topicId}`}
            onClick={() => dispatch(resetThreadDetail())}
          >
            <div className="flex">
              <img
                src={arrowLeftLogo}
                className="h-8 w-8"
                alt="arrow"
                width="40px"
                height="40px"
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center pl-5 py-2 h-12 grow">
          <h1 className="w-10 grow text-left text-ellipsis overflow-hidden whitespace-nowrap">
            {threadDetailViewState.title}
          </h1>
        </div>

        {threadDetailViewState._id !== "" ? (
          <div className="flex mr-2 items-center">
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-700">
              <div className="relative p-[0.625rem] group">
                <img
                  src={elevatorLogo}
                  className="h-7 w-7"
                  alt="arrow"
                  width="40px"
                  height="40px"
                />
                <div className="hidden group-hover:block absolute top-12 left-0">
                  <div className="bg-white shadow-lg rounded-md w-24 h-fit overflow-y-scroll">
                    {[...Array(threadDetailViewState.totalPage)].map((_, i) => (
                      <Link
                        key={`${i}-pageLink`}
                        className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        to={`/topic/${params.topicId}/thread/${
                          params.thread
                        }/page/${i + 1}`}
                        reloadDocument={true}
                      >
                        {`Page ${i + 1}`}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer hover:bg-gray-700"
              onClick={() =>
                dispatch(
                  initializeContentForm({
                    type: ContentCreationFormType.Comment,
                    itemId: { threadId: threadDetailViewState._id },
                    formDisplayTitle: threadDetailViewState.title,
                  })
                )
              }
            >
              <div className="flex p-[0.625rem]">
                <img
                  src={addCommentLogo}
                  className="h-7 w-7"
                  alt="arrow"
                  width="40px"
                  height="40px"
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ThreadDetailViewNav;
