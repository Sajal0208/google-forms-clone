import {z} from 'zod';

export const createOptionInputValidator = z.object({
    optionTitle: z.string().min(1),
    optionImage: z.string().optional(),
    questionId: z.string(),
})