import { ApiProperty } from '@nestjs/swagger'

export class CreateUser {
  @ApiProperty()
  message: string
}
