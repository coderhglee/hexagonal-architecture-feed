import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../domain/entities/user.entity';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserMap } from '../models/mapper/user.map';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('UserModel')
    private catModel: typeof UserModel,
  ) {}

  async create(cat: User): Promise<User> {
    const userModel = UserMap.toModel(cat);

    await userModel.save();

    return UserMap.toEntity(userModel);
  }

  async update(user: User): Promise<User> {
    const userModel = UserMap.toModel(user);

    await userModel.save();

    return UserMap.toEntity(userModel);
  }

  async delete(userId: string): Promise<void> {
    const foundCat = await this.catModel.findByPk(userId);

    await foundCat.destroy();
  }

  async findById(userId: string): Promise<User | null> {
    const foundUser = await this.catModel.findByPk(userId);

    if (!foundUser) {
      return null;
    }

    return UserMap.toEntity(foundUser);
  }
}
