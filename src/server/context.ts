import { prisma } from "@/lib/PrismaClient";
import { inferAsyncReturnType } from "@trpc/server";

export function createContext() {
    return {
        prisma,
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;