export interface IComment {
  _id: string;
  threadId: string;
  threadCommentNum: number;
  upvote: number;
  downvote: number;
  ancestor: string[];
  children: string[];
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}
