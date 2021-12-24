export interface Chat {
    id: number;
    firstUserId: number;
    secondUserId: number;
}

export interface Message {
    id: number;
    message: string;
    date: Date;
}

export interface ChatToMessage {
    chatId: number;
    messageId: number;
}