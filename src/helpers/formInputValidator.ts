import { z } from 'zod';
import { createQuestionInputValidator } from './questionInputValidator';

const responseValidator = z.object({
    id: z.string(),
    userId: z.string(),
    formId: z.string(),
})

export const createFormInputValidator = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    questions: z.array(createQuestionInputValidator).min(1), 
    startDate: z.date().min(new Date()),
    endDate: z.date().min(new Date()),
    responses: z.array(responseValidator).optional(),
    link: z.string().optional(),                                     
})
export type CreateFormInputValidator = z.infer<typeof createFormInputValidator>

export const deleteFormInputValidator = z.object({
    id: z.string(),
})
export type DeleteFormInputValidator = z.infer<typeof deleteFormInputValidator>

export const updateFormInputValidator = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
})
export type UpdateFormInputValidator = z.infer<typeof updateFormInputValidator>