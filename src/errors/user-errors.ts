import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistingError extends ConflictException {
  constructor() {
    super('Email already used');
  }
}
