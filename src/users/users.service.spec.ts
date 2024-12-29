import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findOneByEmail', () => {
    it('should return user', async () => {
      const result = {
        id: '1',
        name: 'test',
        email: 'test@test.com',
        passwordHash: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      jest
        .spyOn(service, 'findOneByEmail')
        .mockImplementation(async () => result)

      expect(await service.findOneByEmail('email')).toBe(result)
    })
  })

  describe('create', () => {
    it('should create user', async () => {
      jest.spyOn(service, 'create').mockImplementation()

      expect(
        await service.create({
          email: 'test@test.com',
          name: 'name',
          password: 'password',
        })
      ).toBeUndefined()
    })
  })
})
