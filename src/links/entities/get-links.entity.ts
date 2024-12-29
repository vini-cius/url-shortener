import { ApiProperty } from '@nestjs/swagger'

export class Link {
  @ApiProperty({ type: 'string' })
  id: string
  @ApiProperty({ type: 'string' })
  code: string
  @ApiProperty({ type: 'string' })
  originalUrl: string
  @ApiProperty({ type: 'string' })
  createdAt: string
  @ApiProperty({ type: 'number' })
  clicks: number
}

export class GetLinks {
  @ApiProperty({ isArray: true, type: Link })
  links: Link[]
}
