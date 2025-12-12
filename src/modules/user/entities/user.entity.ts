import { User as PrismaUser } from '@infra/@types/client';

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static fromPrisma(user: PrismaUser): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.createdAt,
      user.updatedAt,
    );
  }
}
