export const fetchDayWord = async () => {
    const response = await fetch("http:/localhost:3000/api/word-of-day",{
        next: {
            revalidate: false
        }
    });
    const data = await response.json();
    return data as {
        word: string;
    } | undefined;
}