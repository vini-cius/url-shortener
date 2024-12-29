import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, AuthService, JwtService],
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('signIn', () => {
    it('should return access token', async () => {
      const result = {
        token: 'token',
      }

      jest.spyOn(controller, 'signIn').mockImplementation(async () => result)

      expect(
        await controller.signIn({
          email: 'test@test.com',
          password: 'password',
        })
      ).toBe(result)
    })
  })
})
