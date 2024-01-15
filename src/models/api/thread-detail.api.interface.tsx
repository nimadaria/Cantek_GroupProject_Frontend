import { IComment } from "./comment.api.interface";

export interface IThreadDetail {
  _id: string;
  title: string;
  comments: IComment[];
  userId: string;
  createdAt: string;
  totalPage: number;
  pageSize: number;
}
