import { User } from '../entities/user.entity';

export interface IUserRepository {
  create: (user: User) => Promise<User>;

  update: (user: User) => Promise<User>;

  delete: (userId: string) => Promise<void>;

  findById: (userId: string) => Promise<User>;
}
