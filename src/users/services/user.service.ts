import { Injectable } from '@nestjs/common';
import { UsersPrismaService } from './users.prisma-service';
import { CreateUserInput } from '../interfaces';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: UsersPrismaService) {}
  // create a simple crud with user prisma service
  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
  async findMany() {
    return this.prisma.user.findMany();
  }
  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: string, data) {
    return this.prisma.user.update({ where: { id }, data });
  }
  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
