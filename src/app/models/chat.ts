
export interface Chat {
    id: number;
}

export interface UserToChat {
    userId: number;
    chatId: number;
}

export interface Message {
    id: number;
    userId: number;
    message: string;
    date: Date;
}

export interface ChatToMessage {
    chatId: number;
    messageId: number;
}