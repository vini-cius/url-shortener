import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export class CreateUserDto extends createZodDto(createUserSchema) { }
