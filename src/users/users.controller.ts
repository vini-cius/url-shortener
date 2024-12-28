import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUser } from './entities/create-user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: CreateUser })
  @ApiResponse({ status: 400 })
  async create(@Body() user: CreateUserDto) {
    const { email, name, password } = user

    const userWithSameEmail = await this.usersService.findOneByEmail(user.email)

    if (userWithSameEmail) {
      throw new HttpException('User already exists', 400)
    }

    const passwordHash = await hash(password, 6)

    await this.usersService.create({ email, name, password: passwordHash })

    return {
      message: 'User created',
    }
  }
}
