import { WordsBox } from "@/components/WordsBox"
import { fetchDayWord } from "@/services/fetchDayWord";

export const runtime = 'experimental-edge';

export default async function Home() {
  
  const data = await fetchDayWord();

  return (
    <main
      className="bg-black w-full"
    >
      <WordsBox 
        expectedWord={data?.word || "ureia"}
      />
    </main>
  )
}
