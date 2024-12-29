import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { LinksService } from './links.service'

describe('LinksService', () => {
  let service: LinksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        PrismaService,
        AuthService,
        UsersService,
        JwtService,
      ],
    }).compile()

    service = module.get<LinksService>(LinksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
