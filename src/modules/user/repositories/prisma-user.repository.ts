import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return User.fromPrisma(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
