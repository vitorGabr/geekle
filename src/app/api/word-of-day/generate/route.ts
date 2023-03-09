import { prisma } from "@/lib/PrismaClient"
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        let randomWord = '';
        const response = await fetch('https://api.dicionario-aberto.net/random', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: {
                revalidate: 0
            }
        });
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
