import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const userSession = getAuth(req);
  console.log("User Session: ", userSession)
  const userId = userSession.userId
  if(userId === undefined || userId === null) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    })
  }
  const user = await clerkClient.users.getUser(userId)
  // Get user by userId
  return {
    db,
    req,
    res,
    currentUser: user,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
const enforceUserIsAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.currentUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    })
  }
  return next({
    ctx: {
      session: ctx.currentUser,
    }
  });
});

export const privateProcedure = publicProcedure.use(enforceUserIsAuthenticated);