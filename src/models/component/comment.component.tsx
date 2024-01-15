import { IComment } from "../api/comment.api.interface";

export interface ICommentComponent extends IComment {
  ancestorTree: IComment[];
}
