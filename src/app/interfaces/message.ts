export interface Message {
    id: number,
    userId: number,
    type: 'incoming' | 'outcoming',
    message: string
    deleted?: boolean
}
