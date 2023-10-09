import { z } from 'zod';
import { createOptionInputValidator } from './optionFormInputValidator';

const createAnswerInputValidator = z.object({
    answer: z.string().min(1),
})

export const createQuestionInputValidator = z.object({
    questionTitle: z.string().min(10),
    questionDescription: z.string().min(10).optional(),
    options: z.array(createOptionInputValidator).min(1),
    questionType: z.enum(['TEXT', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE']),
    formId: z.string().optional(),
    answer: z.array(createAnswerInputValidator).min(1),
    isRequired: z.boolean()
})
export type CreateQuestionInputValidator = z.infer<typeof createQuestionInputValidator>