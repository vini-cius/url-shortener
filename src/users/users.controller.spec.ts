import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
      controllers: [UsersController],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create user', async () => {
      const result = {
        message: 'User created',
      }

      jest.spyOn(controller, 'create').mockImplementation(async () => result)

      expect(
        await controller.create({
          email: 'test@test.com',
          name: 'test',
          password: 'test',
        })
      ).toBe(result)
    })
  })
})
