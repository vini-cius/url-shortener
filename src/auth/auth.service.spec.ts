import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService, PrismaService],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('signIn', () => {
    it('should return access token', async () => {
      const result = {
        token: 'token',
      }

      jest.spyOn(service, 'signIn').mockImplementation(async () => result)

      expect(await service.signIn('test@test.com', 'password')).toBe(result)
    })
  })
})
