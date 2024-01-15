import { ITopic } from "./topic.api.interface";

export interface ISection {
  _id: string;
  title: string;
  topics: ITopic[];
}
