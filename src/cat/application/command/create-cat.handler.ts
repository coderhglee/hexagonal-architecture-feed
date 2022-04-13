import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Cat } from '../../domain/entities/cat.entity';
import { ICatService } from '../../domain/service/cat.service.interface';

import { CreateCatCommand } from './create-cat.command';

@CommandHandler(CreateCatCommand)
export class CreateCatHandler implements ICommandHandler<CreateCatCommand> {
  constructor(
    @Inject('ICatService')
    private readonly catService: ICatService,
  ) {}

  async execute(command: CreateCatCommand): Promise<Cat> {
    const createdCat = await this.catService.create(
      command.name,
      command.age,
      command.breed,
    );

    return createdCat;
  }
}
