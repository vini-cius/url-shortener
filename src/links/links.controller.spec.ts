import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'

import { AuthService } from '../auth/auth.service'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/users.service'
import { LinksController } from './links.controller'
import { LinksService } from './links.service'

describe('LinksController', () => {
  let controller: LinksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        AuthService,
        PrismaService,
        JwtService,
        UsersService,
      ],
      controllers: [LinksController],
    }).compile()

    controller = module.get<LinksController>(LinksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
