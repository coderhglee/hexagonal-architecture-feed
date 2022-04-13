import { Cat } from '../entities/cat.entity';

export interface ICatsRepository {
  create: (cat: Cat) => Promise<Cat>;

  findById: (catId: string) => Promise<Cat | null>;

  findAll: () => Promise<Cat[]>;
}
