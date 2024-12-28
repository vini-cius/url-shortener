import { ApiProperty } from '@nestjs/swagger'

export class SignIn {
  @ApiProperty({ description: 'JWT bearer token' })
  token: string
}
