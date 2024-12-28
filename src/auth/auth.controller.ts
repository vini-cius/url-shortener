import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { CredentialsDto } from './dto/sign-in.dto'
import { SignIn } from './entities/sign-in.entity'

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: SignIn })
  @ApiUnauthorizedResponse({
    schema: { example: { message: 'Invalid credentials' } },
  })
  signIn(@Body() credentials: CredentialsDto) {
    const { email, password } = credentials

    return this.authService.signIn(email, password)
  }
}
