import { postRouter } from '~/server/api/routers/post';
import { createCallerFactory, createTRPCRouter, t } from '~/server/api/trpc';
import { createRouter } from './routers/generated/routers';

const crudRouter = createRouter();

export const appRouter = t.mergeRouters(
    createTRPCRouter({ post: postRouter }),
    createTRPCRouter({ crud: crudRouter })
);

// /**
//  * This is the primary router for your server.
//  *
//  * All routers added in /api/routers should be manually added here.
//  */
// export const appRouter = createTRPCRouter({
//   post: postRouter,
// });

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
