import { Cat } from '../entities/cat.entity';

export interface ICatService {
  findById(catId: string): Promise<Cat>;

  create(name: string, age: number, breed: string): Promise<Cat>;
}
