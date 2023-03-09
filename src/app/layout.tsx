import { Metadata } from 'next'
import './globals.css'

export const metadata = {
  title: "Quizle - Jogue o melhor jogo de adivinhação de palavras",
  description: "Quizle é um jogo online de adivinhação de palavras viciante e desafiador. Teste suas habilidades de vocabulário e veja quantas palavras você consegue adivinhar em cinco tentativas. Jogue agora gratuitamente!",
  keywords: ["jogo de palavras", "adivinhação de palavras", "jogo de vocabulário", "jogo de adivinhação", "jogo gratuito", "Quizle"],
  author: [{ name: "Vitor Gabriel", email: "vitorgabriel@gmail.com" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: { index: true, follow: true },
} as Metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className='h-screen flex-grow flex flex-col'>
        <div className="w-full bg-black py-6" >
          <h1 className="text-4xl font-bold text-center text-white">Quizle</h1>
        </div>
        {children}
        </body>
    </html>
  )
}
