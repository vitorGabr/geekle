export const fetchDayWord = async () => {
    const response = await fetch(process.env.BASE_URL +"/api/word-of-day",);
    const data = await response.json();
    return data as {
        word: string;
    } | undefined;
}