import {z} from 'zod';

export const createUserInputValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
})

export const updateUserInputValidator = z.object({
    id: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
})
