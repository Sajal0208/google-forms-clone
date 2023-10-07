import { z } from 'zod';
import { createOptionInputValidator } from './optionFormInputValidator';

export const createQuestionInputValidator = z.object({
    questionTitle: z.string().min(10),
    questionDescription: z.string().min(10).optional(),
    options: z.array(createOptionInputValidator).min(1),
    questionType: z.enum(['TEXT', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE']),
    formId: z.string().optional(),
    answer: z.array(z.number()).min(1),
    isRequired: z.boolean()
})
export type CreateQuestionInputValidator = z.infer<typeof createQuestionInputValidator>