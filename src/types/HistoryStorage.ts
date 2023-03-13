import { ResultWord } from "./ResultWord";

export type HistoryStorage = {
    [key: string]: {
        history: ResultWord[];
        completed: boolean;
        word?: string;
    }
}