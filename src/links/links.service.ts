import { randomUUID } from 'node:crypto'

import { Injectable } from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async create(url: string, bearerToken: string | undefined) {
    const token = bearerToken?.split(' ')[1]

    const userId = token
      ? (await this.authService.getUserFromToken(token)).id
      : null

    const code = randomUUID().slice(0, 6)

    await this.prisma.shortLink.create({
      data: {
        originalUrl: url,
        code,
        userId,
      },
    })

    return {
      message: 'Link created',
      link: `${process.env.APP_URL}/${code}`,
    }
  }
}
