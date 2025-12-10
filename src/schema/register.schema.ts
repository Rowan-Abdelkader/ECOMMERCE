import { error } from 'console';
import * as z from 'zod';

export const registerSchema = z.object({

    name: z.string().min(2, 'Name must be at least 2 characters long').max(30, 'Name must be at most 30 characters long'),
    email:  z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
    phone: z.string().regex(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits")
}).refine(function(object){
	if(object.password == object.rePassword){
		return true;
	}
	return false;
},{
	path: ['rePassword'],
	message: 'Passwords do not match'	
})

export type RegisterSchemaType =z.infer<typeof registerSchema>

