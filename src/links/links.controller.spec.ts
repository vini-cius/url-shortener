import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Request, Response } from 'express'
import Redis from 'ioredis'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { LinksController } from './links.controller'
import { LinksService } from './links.service'

describe('LinksController', () => {
  let controller: LinksController
  let req: Request

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
        AuthService,
        PrismaService,
        JwtService,
        UsersService,
        {
          provide: RedisService,
          useValue: { getOrThrow: () => new Redis() },
        },
      ],
      controllers: [LinksController],
    }).compile()

    controller = module.get<LinksController>(LinksController)
    req = {
      user: {
        sub: '1',
        email: 'test@test.com',
      },
    } as Request
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('createLink', () => {
    it('should return created link', async () => {
      const result = {
        link: 'http://localhost/1',
      }

      jest.spyOn(controller, 'create').mockImplementation(async () => result)

      expect(
        await controller.create({ url: 'http://localhost/1' }, undefined)
      ).toBe(result)
    })
  })

  describe('getLink', () => {
    it('should redirect to original url', async () => {
      jest.spyOn(controller, 'getLink').mockImplementation()

      const response = {
        redirect: jest.fn(),
      } as unknown as Response

      expect(await controller.getLink('1', response)).toBeUndefined()
    })
  })

  describe('getLinks', () => {
    it('should return user links', async () => {
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

      jest.spyOn(controller, 'getLinks').mockImplementation(async () => result)

      expect(await controller.getLinks(req)).toBe(result)
    })
  })

  describe('deleteLink', () => {
    it('should delete link', async () => {
      jest.spyOn(controller, 'deleteLink').mockImplementation()

      expect(await controller.deleteLink(req, '1')).toBeUndefined()
    })
  })

  describe('updateLink', () => {
    it('should update link', async () => {
      jest.spyOn(controller, 'updateLink').mockImplementation()

      expect(
        await controller.updateLink(req, '1', { url: 'http://localhost/1' })
      ).toBeUndefined()
    })
  })
})
