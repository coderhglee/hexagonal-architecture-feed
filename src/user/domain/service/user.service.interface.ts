import { User } from '../entities/user.entity';

export interface IUserService {
  findById(UserId: string): Promise<User>;

  create(user: User): Promise<User>;
}
