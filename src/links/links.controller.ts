import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

import { CreateLinkDto } from './dto/create-link.dto'
import { CreateLink } from './entities/create-link.entity'
import { LinksService } from './links.service'

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller()
export class LinksController {
  constructor(private linksService: LinksService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('api/links')
  @ApiOperation({ summary: 'Create link' })
  @ApiResponse({ status: 201, type: CreateLink })
  @ApiBearerAuth()
  async create(
    @Body() { url }: CreateLinkDto,
    @Headers('authorization') token: string | undefined
  ) {
    return this.linksService.create(url, token)
  }
}
