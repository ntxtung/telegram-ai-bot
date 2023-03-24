import { Module } from '@nestjs/common';
import { UserService, UsersPrismaService } from './services';

@Module({
  providers: [UserService, UsersPrismaService],
  exports: [UserService],
})
export class UsersModule {}
