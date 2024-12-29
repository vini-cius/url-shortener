import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import Redis from 'ioredis'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { LinksService } from './links.service'

describe('LinksService', () => {
  let service: LinksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
          },
        }),
      ],
      providers: [
        LinksService,
        PrismaService,
        AuthService,
        UsersService,
        JwtService,
        {
          provide: RedisService,
          useValue: { getOrThrow: () => new Redis() },
        },
      ],
    }).compile()

    service = module.get<LinksService>(LinksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
