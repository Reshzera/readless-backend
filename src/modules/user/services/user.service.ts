import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserAlreadyExistingError } from '../../../errors/userErrors';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UserAlreadyExistingError();
    }

    return this.userRepository.create(createUserDto);
  }
}
