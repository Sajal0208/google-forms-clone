import { z } from 'zod';

export const createQuestionInputValidator = z.object({
    title: z.string(),
    description: z.string(),
    options: z.array(z.string()),
    questionType: z.enum(['TEXT', 'MULTIPLE_CHOICE', 'CHECKBOX']),
    formId: z.string(),
    answerId: z.string().optional(),
})