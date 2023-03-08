export const verifyIfWordIsValid = async (word: string) => {
    const response = await fetch(`https://api.dicionario-aberto.net/word/${word}`);
    const data = await response.json();
    return data.length > 0;
}