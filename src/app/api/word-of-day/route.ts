import { prisma } from "@/lib/PrismaClient"
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const word = await prisma.word.findFirst({
      where: {
        to: {
          gte: dayjs().subtract(1, "day").toDate()
        }
      }
    })
    if(!word) {
      throw new Error("No word of the day found");
    }
    return NextResponse.json(word);
  } catch (error) {
    return NextResponse.json('adasd',{
      status: 500
    });
  }
}
