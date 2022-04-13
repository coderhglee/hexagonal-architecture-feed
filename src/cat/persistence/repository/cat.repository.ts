import { Inject, Injectable } from '@nestjs/common';

import { Cat } from '../../domain/entities/cat.entity';
import { CatMap } from '../models/mapper/cat.map';
import { ICatsRepository } from '../../domain/repository/cat.repository.interface';
import { CatModel } from '../models/cat.model';

@Injectable()
export class CatsRepository implements ICatsRepository {
  constructor(
    @Inject('CatModel')
    private catModel: typeof CatModel,
  ) {}

  async create(cat: Cat): Promise<Cat> {
    const catModel = CatMap.toModel(cat);

    await catModel.save();

    return CatMap.toEntity(catModel);
  }

  async findById(catId: string): Promise<Cat | null> {
    const foundCat = await this.catModel.findByPk(catId);

    if (!foundCat) {
      return null;
    }

    return CatMap.toEntity(foundCat);
  }

  async findAll(): Promise<Cat[]> {
    const catModels = await this.catModel.findAll<CatModel>();

    return catModels.map(CatMap.toEntity);
  }
}
