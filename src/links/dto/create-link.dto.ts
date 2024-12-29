import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const createLinkSchema = z.object({
  url: z.string().url(),
})

export class CreateLinkDto extends createZodDto(createLinkSchema) {}
