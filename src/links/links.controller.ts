import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
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
  @ApiHeader({
    name: 'authorization',
    required: false,
    description: 'Bearer token',
  })
  async create(
    @Body() { url }: CreateLinkDto,
    @Headers('authorization') token?: string
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
  @ApiOperation({ summary: 'Get user links' })
  @ApiResponse({ status: HttpStatus.OK, type: GetLinks })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getLinks(@Req() req: Request) {
    const { user } = req

    return this.linksService.getLinks(user.sub)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('api/links/:id')
  @ApiOperation({ summary: 'Delete link' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async deleteLink(@Req() req: Request, @Param('id') id: string) {
    const {
      user: { sub: userId },
    } = req

    return this.linksService.deleteLink(id, userId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('api/links/:id')
  @ApiOperation({ summary: 'Update link' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateLink(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() { url }: CreateLinkDto
  ) {
    const {
      user: { sub: userId },
    } = req

    return this.linksService.updateLink(id, userId, url)
  }
}
