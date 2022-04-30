import { User } from '../../../domain/entities/user.entity';
import { UserModel } from '../user.model';

export class UserMap {
  public static toEntity(userModel: UserModel): User {
    return new User(userModel.id, userModel.name, userModel.createdAt);
  }

  public static toModel(user: User): UserModel {
    return UserModel.build({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
    });
  }
}
