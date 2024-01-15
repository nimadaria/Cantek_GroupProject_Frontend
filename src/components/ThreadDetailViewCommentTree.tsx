import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { IComment } from "../models/api/comment.api.interface";
import { ICommentComponent } from "../models/component/comment.component";
import { loadCommentAncestor } from "../reducers/threadDetailReducer";
import { useEffect } from "react";

const ThreadDetailViewCommentTree = ({
  data,
  pageNum,
}: {
  data: ICommentComponent;
  pageNum: number;
}) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data.ancestorTree.length === 0) {
      const ancestorIds = getAncestorIdsByPage(
        data.ancestor,
        data.ancestorTree
      );
      dispatch(
        loadCommentAncestor({ pageNum, commentId: data._id, ancestorIds })
      );
    }
  }, []);

  const blockQuoteMetaData: {
    dispatchCallback?: () => void;
    ancestorCount: number;
  } = {
    ancestorCount: data.ancestor.length,
  };

  const ancestorIds = getAncestorIdsByPage(data.ancestor, data.ancestorTree);
  if (ancestorIds.length > 0) {
    blockQuoteMetaData.dispatchCallback = () =>
      dispatch(
        loadCommentAncestor({ pageNum, commentId: data._id, ancestorIds })
      );
  }

  return (
    <div className="my-2">
      <CommentTreeBlockQuote
        metaData={blockQuoteMetaData}
        ancestorTree={data.ancestorTree}
        isRoot={true}
        counter={1}
      />
    </div>
  );
};

const CommentTreeBlockQuote = ({
  metaData,
  ancestorTree,
  isRoot,
  counter,
}: {
  metaData: { dispatchCallback?: () => void; ancestorCount: number };
  ancestorTree: IComment[];
  isRoot: boolean;
  counter: number;
}) => {
  if (ancestorTree.length === 0) return <></>;

  const [first, ...rest] = ancestorTree;

  return (
    <blockquote className={`relative ${isRoot ? "" : "ml-3 mb-2"}`}>
      <div className="absolute h-full w-[5px] cursor-pointer group">
        <div className="bg-gray-800 group-hover:bg-gray-400 w-[2px] h-full"></div>
      </div>

      {rest.length > 0 ? (
        <CommentTreeBlockQuote
          metaData={metaData}
          ancestorTree={rest}
          isRoot={false}
          counter={counter + 1}
        />
      ) : (
        <>
          {counter < metaData.ancestorCount && (
            <blockquote className="relative ml-3 mb-2">
              <div className="absolute h-full w-[5px] group">
                <div className="bg-gray-800 w-[2px] h-full"></div>
              </div>
              <div className="h-8" onClick={metaData.dispatchCallback}>
                <span className="ml-3 cursor-pointer border border-black border-solid rounded text-xs p-1 hover:bg-gray-300">
                  Load More
                </span>
              </div>
            </blockquote>
          )}
        </>
      )}

      <p className="ml-3">{first.content}</p>
    </blockquote>
  );
};

const getAncestorIdsByPage = (
  ancestors: string[],
  ancestorTree: IComment[]
): string[] => {
  const pageSize = 3;
  if (ancestors.length > ancestorTree.length) {
    const startIdx = ancestorTree.length;
    const endIdx = Math.min(startIdx + pageSize, ancestors.length);
    return ancestors.slice(startIdx, endIdx);
  } else {
    return [];
  }
};

export default ThreadDetailViewCommentTree;
