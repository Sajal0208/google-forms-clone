import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createUserInputValidator,
  updateUserInputValidator,
} from "~/helpers/userInputValidator";
import { clerkClient } from "@clerk/nextjs";

export const userRouter = createTRPCRouter({
  // Create a user
  createUser: publicProcedure
    .input(createUserInputValidator)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, email } = input;
      const { db } = ctx;


      try {
        // Create the user in the database
        const createdUser = await db.user.create({
          data: {
            firstName,
            lastName,
            email,
          },
        });

        return createdUser; // Return the created user object
      } catch (e) {
        console.log(e);
      } 
    }),

  // Get User by Id
  getUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      const { name } = input;
      return `Hello ${name}!`;
    }),

  // Get All Users
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await clerkClient.users.getUserList();
    return users;
  }),

  // Update a user
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, email } = input;
      const { db } = ctx;
      try {
        const updatedUser = await db.user.update({
          where: {
            id,
          },
          data: {
            firstName,
            lastName,
            email,
          },
        });
        return updatedUser;
      } catch (e) {
        console.log(e);
      } 
    }),
});
