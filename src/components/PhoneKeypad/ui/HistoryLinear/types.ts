export type IHistoryItemLinear = {
    label: string;
    timestamp: number;
};

export type PropsHistoryLinear = {
    history: IHistoryItemLinear[] | [];
};
