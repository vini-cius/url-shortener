import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger'

import { CreateUserDto } from './dto/create-user.dto'
import { CreateUser } from './entities/create-user.entity'
import { UsersService } from './users.service'

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: CreateUser })
  async create(@Body() user: CreateUserDto) {
    const { email, name, password } = user

    const userWithSameEmail = await this.usersService.findOneByEmail(user.email)

    if (userWithSameEmail) {
      throw new HttpException('User already exists', 400)
    }

    await this.usersService.create({ email, name, password })

    return {
      message: 'User created',
    }
  }
}
