import { ApiProperty } from '@nestjs/swagger'

export class CreateLink {
  @ApiProperty()
  message: string

  @ApiProperty()
  link: string
}
