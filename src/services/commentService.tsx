import axios from "axios";
import { IApiResponse } from "../models/api/api-response.api.interface";
import { IComment } from "../models/api/comment.api.interface";

const baseUrl = import.meta.env.VITE_FORUM_BASE_URL;
const commentUrl = `${baseUrl}/comment`;

const getCommentInBatch = async ({ commentIds }: { commentIds?: string[] }) => {
  const requestUrl = `${commentUrl}/batch`;

  if (commentIds && commentIds.length > 0) {
    const { data }: { data: IApiResponse<IComment> } = await axios.post(
      requestUrl,
      {
        commentIds,
      }
    );
    return data.body;
  } else {
    return [];
  }
};

const upvoteComment = async ({ commentId }: { commentId: string }) => {
  const requestUrl = `${commentUrl}/${commentId}/upvote`;
  const { data }: { data: IApiResponse<IComment> } = await axios.post(
    requestUrl,
    {},
    { withCredentials: true }
  );
  return data.body;
};

const downvoteComment = async ({ commentId }: { commentId: string }) => {
  const requestUrl = `${commentUrl}/${commentId}/downvote`;
  const { data }: { data: IApiResponse<IComment> } = await axios.post(
    requestUrl,
    {},
    { withCredentials: true }
  );
  return data.body;
};

export default { getCommentInBatch, upvoteComment, downvoteComment };
