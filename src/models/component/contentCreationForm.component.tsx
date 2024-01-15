export interface IContentCreationForm {
  isActive: boolean;
  type: string;
  itemId: { topicId?: string; threadId?: string; commentId?: string };
  formDisplayTitle: string;
  formDisplayContent: string;
}
