export interface Message {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  content: string;
  createdAt: Date;
  read: boolean;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  messageId: string;
  content: string;
  createdAt: Date;
  isAdmin: boolean;
}