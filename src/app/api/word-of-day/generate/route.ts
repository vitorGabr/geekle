import { prisma } from "@/lib/PrismaClient"
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        let randomWord = '';
        const response = await fetch('https://api.dicionario-aberto.net/random');
        const data = await response.json();
        randomWord = data.word;

        if (randomWord.length > 10) {
            throw new Error('Word too long');
        }

        await prisma.word.create({
            data: {
                word: randomWord,
                to: dayjs().add(1, "day").toDate()
            }
        })

        return NextResponse.json('ok');
    } catch (error) {
        return NextResponse.json(JSON.stringify(error), {
            status: 500
        });
    }
}
