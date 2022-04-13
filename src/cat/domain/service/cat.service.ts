import { v4 } from 'uuid';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Cat } from '../entities/cat.entity';
import { ICatsRepository } from '../repository/cat.repository.interface';

import { CatCreatedEvent } from '../events/cat-created.event';

import { IEventPublisher } from '../../../common/event-publisher.interface';

import { ICatService } from './cat.service.interface';

@Injectable()
export class CatService implements ICatService {
  constructor(
    @Inject('ICatsRepository')
    private readonly catRepository: ICatsRepository,
    @Inject('IEventPublisher')
    private readonly eventPublisher: IEventPublisher,
  ) {}

  async findById(catId: string): Promise<Cat> {
    const foundCat = await this.catRepository.findById(catId);

    if (!foundCat) {
      throw new NotFoundException();
    }

    return foundCat;
  }

  async create(name: string, age: number, breed: string): Promise<Cat> {
    const cat = new Cat(v4(), name, age, breed);

    this.eventPublisher.publish(new CatCreatedEvent(cat));

    return this.catRepository.create(cat);
  }
}
