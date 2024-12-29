import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'
import { Request, Response } from 'express'

import { AuthGuard } from '../auth/auth.guard'
import { CreateLinkDto } from './dto/create-link.dto'
import { CreateLink } from './entities/create-link.entity'
import { GetLinks } from './entities/get-links.entity'
import { LinksService } from './links.service'

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller()
export class LinksController {
  constructor(private linksService: LinksService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('api/links')
  @ApiOperation({ summary: 'Create link' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateLink })
  @ApiBearerAuth()
  async create(
    @Body() { url }: CreateLinkDto,
    @Headers('authorization') token: string | undefined
  ) {
    return this.linksService.create(url, token)
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get link' })
  async getLink(@Param('code') code: string, @Res() res: Response) {
    const { link } = await this.linksService.getLink(code)

    return res.status(HttpStatus.MOVED_PERMANENTLY).redirect(link)
  }

  @HttpCode(HttpStatus.OK)
  @Get('api/links')
  @ApiOperation({ summary: 'Get links' })
  @ApiResponse({ status: HttpStatus.OK, type: GetLinks })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getLinks(@Req() req: Request) {
    const { user } = req

    return this.linksService.getLinks(user.sub)
  }
}
