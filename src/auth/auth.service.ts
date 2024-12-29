import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatch = await compare(password, user.passwordHash)

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: user.id, email: user.email }

    const token = await this.jwtService.signAsync(payload)

    return { token }
  }

  async getUserFromToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.APP_SECRET,
      })

      const user = await this.usersService.findOneByEmail(payload.email)

      return user
    } catch {
      throw new UnauthorizedException()
    }
  }
}
