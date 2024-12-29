import { ApiProperty } from '@nestjs/swagger'

export class CreateLink {
  @ApiProperty()
  link: string
}
