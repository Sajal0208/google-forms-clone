import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { createFormInputValidator, deleteFormInputValidator, updateFormInputValidator } from "../../../helpers/formInputValidator";
import { TRPCError } from "@trpc/server";

export const formRouter = createTRPCRouter({
  getFormByUserId: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx }) => {
      const { currentUser } = ctx;
      const { id } = currentUser;
      const { db } = ctx;
      const forms = await db.form.findMany({
        where: {
          id: Number(id),
        },
      });
      return {
        forms: forms,
      };
    }),


  getAllForms: publicProcedure.query(({ ctx }) => {
    return ctx.db.form.findMany({});
  }),


  createForm: privateProcedure
    .input(createFormInputValidator)
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const {
        title,
        description,
        authorId,
        questions,
        startDate,
        endDate,
        link,
      } = input;
      if (questions.length < 0 || questions === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "questions length must be greater than 0",
        })
      }
      const author = await db.user.findUnique({
        where: {
          id: authorId,
        },
      });
      if(!author) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "author does not exist",
        })
      }
      const form = await db.form.create({
        data: {
          title,
          description,
          authorId,
          questions: {},
          startDate,
          endDate,
          link: link ?? ''
        },
      });
      if (!form) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create form",
        });
      }
      return {
        form,
      };
    }),

    deleteForm: privateProcedure.input(deleteFormInputValidator).mutation(async ({ctx, input}) => {
      const {db} = ctx;
      const {id} = input;
      const form = await db.form.findUnique({
        where: {
          id: Number(id)
        }
      })

      if(!form) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "form does not exist"
        })
      }

      const authorId = ctx.currentUser.id;
      if(authorId != id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "user is not authorized to do this action"
        })
      }

      const deletedForm = await db.form.delete({
        where: {
          id: Number(id)
        }
      })

      return {
        id
      }
    }),

    updateForm: privateProcedure.input(updateFormInputValidator).mutation(async ({ctx, input}) => {
      const {db} = ctx;
      const {id} = input;
      if(id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "id is required"
        })
      }
      const form = await db.form.findUnique({
        where: {
          id: Number(id)
        }
      })
      if(!form) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "form does not exist"
        })
      }

      const authorId = ctx.currentUser.id;
      if(authorId != id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "user is not authorized to do this action"
        })
      }
      const newFormData = {
        ...form,
        ...input
      }
      const updatedForm = await db.form.update({
        where: {
          id: Number(id)
        },
        data: {
          title: newFormData.title,
          description: newFormData.description,
          startDate: newFormData.startDate,
          endDate: newFormData.endDate,
        }
      })

      console.log(updatedForm)
    })
});
