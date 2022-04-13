import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Cat } from '../../domain/entities/cat.entity';
import { ICatService } from '../../domain/service/cat.service.interface';

import { GetCatQuery } from './get-cat.query';

@QueryHandler(GetCatQuery)
export class GetCatHandler implements IQueryHandler<GetCatQuery> {
  constructor(private readonly catService: ICatService) {}

  async execute(query: GetCatQuery): Promise<Cat> {
    return this.catService.findById(query.catId);
  }
}
