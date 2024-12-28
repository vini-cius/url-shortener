import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UsersModule],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  }],
})

export class AppModule { }
