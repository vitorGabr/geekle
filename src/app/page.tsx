import { WordsBox } from "@/components/WordsBox"
import { ApiRoute } from "@/types/enums/ApiRoute";

export default async function Home() {

  const response = await fetch(process.env.BASE_URL + ApiRoute.WORD_OF_DAY, {
    next: {
      revalidate: 3600
    }
  });
  const data = await response.json() as {
    word: string;
  } | undefined;


  return (
    <main
      className="bg-black w-full h-full"
    >
      <WordsBox
        expectedWord={data?.word || "ureia"}
      />
    </main>
  )
}
