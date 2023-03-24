export interface CreateUserInput {
  id?: string;
  username: string;
  chatId: number;
  currentDialogId: string;
  firstName: string;
  lastName: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
