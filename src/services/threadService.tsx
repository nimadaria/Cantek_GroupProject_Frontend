import axios from "axios";
import { IApiResponse } from "../models/api/api-response.api.interface";
import { IThreadListApiResponse } from "../models/api/thread-list.api.interface";
import { IThreadDetail } from "../models/api/thread-detail.api.interface";

const baseUrl = import.meta.env.VITE_FORUM_BASE_URL;
const threadUrl = `${baseUrl}/thread`;

const createThread = async ({
  topicId,
  title,
  content,
}: {
  topicId: string;
  title: string;
  content: string;
}) => {
  const requestUrl = threadUrl;
  const { data }: { data: IApiResponse<{ _id: string }> } = await axios.post(
    requestUrl,
    { topicId, title, content },
    { withCredentials: true }
  );
  return data.body;
};

const createThreadComment = async ({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) => {
  const requestUrl = `${threadUrl}/${threadId}/comment`;
  const { data }: { data: IApiResponse<{ _id: string }> } = await axios.post(
    requestUrl,
    { content },
    { withCredentials: true }
  );
  return data.body;
};

const createThreadReplyComment = async ({
  threadId,
  commentId,
  content,
}: {
  threadId: string;
  commentId: string;
  content: string;
}) => {
  const requestUrl = `${threadUrl}/${threadId}/comment/${commentId}/reply`;
  const { data }: { data: IApiResponse<{ _id: string }> } = await axios.post(
    requestUrl,
    { content },
    { withCredentials: true }
  );
  return data.body;
};

const getLatestThreads = async ({
  lastThreadId,
}: {
  lastThreadId?: string;
}) => {
  let requestUrl = `${threadUrl}/all`;
  if (lastThreadId) requestUrl = `${requestUrl}?lastId=${lastThreadId}`;
  const { data }: { data: IApiResponse<IThreadListApiResponse> } =
    await axios.get(requestUrl);
  return data.body;
};

const getThreadsByTopic = async ({
  topicId,
  lastThreadId,
}: {
  topicId?: string;
  lastThreadId?: string;
}) => {
  let requestUrl = `${threadUrl}/all`;
  if (topicId) requestUrl = `${requestUrl}/topic/${topicId}`;
  if (lastThreadId) requestUrl = `${requestUrl}?lastId=${lastThreadId}`;

  const { data }: { data: IApiResponse<IThreadListApiResponse> } =
    await axios.get(requestUrl);
  return data.body;
};

const getThreadDetail = async ({
  threadId,
  pageNum,
}: {
  threadId: string;
  pageNum: number;
}): Promise<{ body?: IThreadDetail; pageNum: number }> => {
  const requestUrl = `${threadUrl}/${threadId}/page/${pageNum}`;

  const { data }: { data: IApiResponse<IThreadDetail> } = await axios.get(
    requestUrl
  );

  return { body: data.body, pageNum };
};

export default {
  getThreadsByTopic,
  getLatestThreads,
  getThreadDetail,
  createThread,
  createThreadComment,
  createThreadReplyComment,
};
