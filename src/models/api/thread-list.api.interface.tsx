import { ITopic } from "./topic.api.interface";

export interface IThreadListApiResponse {
  topic?: ITopic;
  threads: IThreadListItem[];
}

export interface IThreadListItem {
  _id: string;
  title: string;
  vote: number;
  username: string;
  createdAt: string;
}
