import { IThreadListItem } from "../api/thread-list.api.interface";
import { ITopic } from "../api/topic.api.interface";

export interface IThreadListComponentState {
  selectedTopic: ITopic;
  threads: IThreadListItem[];
  isReachEnd: boolean;
}
