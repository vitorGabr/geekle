import { TRPCError } from '@trpc/server';
import dayjs from 'dayjs';
import { procedure, router } from '../trpc';

export const appRouter = router({
    wordDay: procedure
        .query(async ({ ctx }) => {
            const result = await ctx.prisma.word.findFirst({
                where: {
                    to: {
                        gte: dayjs().startOf('day').toDate(),
                        lte: dayjs().endOf('day').toDate(),
                    }
                }
            });
            if (!result) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'No word found for today',
                })
            }

            return {
                word: result.word,
            };
        })
});

export type AppRouter = typeof appRouter;