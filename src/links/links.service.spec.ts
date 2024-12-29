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

  describe('create', () => {
    const result = {
      link: 'http://localhost/1',
    }

    it('should return created link', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => result)

      expect(await service.create('http://localhost/1', undefined)).toBe(result)
    })

    it('should return created link with token', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => result)

      expect(await service.create('http://localhost/1', 'token')).toBe(result)
    })
  })

  describe('getLink', () => {
    const result = {
      link: 'http://localhost/1',
    }

    it('should return link', async () => {
      jest.spyOn(service, 'getLink').mockImplementation(async () => result)

      expect(await service.getLink('1')).toBe(result)
    })
  })

  describe('getLinks', () => {
    const result = {
      links: [
        {
          id: '1',
          code: '1',
          originalUrl: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          clicks: 0,
        },
      ],
    }

    it('should return user links', async () => {
      jest.spyOn(service, 'getLinks').mockImplementation(async () => result)

      expect(await service.getLinks('1')).toBe(result)
    })
  })

  describe('deleteLink', () => {
    it('should delete link', async () => {
      jest.spyOn(service, 'deleteLink').mockImplementation()

      expect(await service.deleteLink('1', '1')).toBeUndefined()
    })
  })

  describe('updateLink', () => {
    it('should update link', async () => {
      jest.spyOn(service, 'updateLink').mockImplementation()

      expect(
        await service.updateLink('1', '1', 'http://localhost/1')
      ).toBeUndefined()
    })
  })
})
