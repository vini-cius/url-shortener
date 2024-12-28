import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async create(user: CreateUserDto) {
    const { email, name, password } = user

    await this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash: password
      }
    })
  }
}
