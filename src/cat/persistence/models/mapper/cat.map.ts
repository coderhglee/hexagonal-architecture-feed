import { Cat } from '../../../domain/entities/cat.entity';
import { CatModel } from '../cat.model';

export class CatMap {
  public static toEntity(catModel: CatModel): Cat {
    return new Cat(catModel.id, catModel.name, catModel.age, catModel.breed);
  }

  public static toModel(cat: Cat): CatModel {
    return CatModel.build({
      id: cat.id,
      name: cat.name,
      age: cat.age,
      breed: cat.breed,
    });
  }
}
