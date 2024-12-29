import { randomUUID } from 'node:crypto'

import { RedisService } from '@liaoliaots/nestjs-redis'
import { BadRequestException, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LinksService {
  private readonly redis: Redis | null

  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getOrThrow()
  }

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
      link: `${process.env.APP_URL}/${code}`,
    }
  }

  async getLink(code: string) {
    const link = await this.prisma.shortLink.findUnique({
      where: { code, deletedAt: null },
    })

    if (!link) {
      throw new BadRequestException('Link not found')
    }

    await this.redis.zincrby('metrics', 1, link.id)

    return {
      link: link.originalUrl,
    }
  }

  async getLinks(userId: string) {
    const links = await this.prisma.shortLink.findMany({
      select: {
        id: true,
        code: true,
        originalUrl: true,
        createdAt: true,
      },
      where: { userId },
    })

    const linksWithMetrics = await Promise.all(
      links.map(async (link) => {
        const clicks = await this.redis.zscore('metrics', link.id)

        return {
          ...link,
          clicks: clicks ? Number(clicks) : 0,
        }
      })
    )

    return {
      links: linksWithMetrics,
    }
  }
}
