import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async create(user: CreateUserDto) {
    const { email, name, password } = user

    const passwordHash = await hash(password, 6)

    await this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    })
  }
}
