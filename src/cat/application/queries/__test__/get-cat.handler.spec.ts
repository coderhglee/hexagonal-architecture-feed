import { Cat } from '../../../domain/entities/cat.entity';
import { CatFactory } from '../../../domain/entities/__test__/cat.factory';

import { GetCatHandler } from '../get-cat.handler';
import { GetCatQuery } from '../get-cat.query';
import { TestDatabase } from '../../../../../test/TestUtil';
import { CatService } from '../../../domain/service/cat.service';
import { CatsRepository } from '../../../persistence/repository/cat.repository';
import { EventPublisher } from '../../../../common/message/event-publisher';
import { CatModel } from '../../../persistence/models/cat.model';

describe('GetCatHandler', () => {
  let createCatHandler: GetCatHandler;
  let catService: CatService;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    database.init();

    const catRepository = new CatsRepository(CatModel);

    catService = new CatService(
      catRepository,
      new EventPublisher({
        publish: jest.fn(),
        publishAll: jest.fn(),
      } as any),
    );

    createCatHandler = new GetCatHandler(catService);
  });

  afterAll(async () => {
    database.close();
  });

  describe('execute', () => {
    let createdCat: Cat;

    beforeAll(async () => {
      const cat = CatFactory.build();
      createdCat = await catService.create(cat.name, cat.age, cat.breed);
    });

    it('cat을 id로 찾을수 있다.', async () => {
      const foundCat = await createCatHandler.execute(
        new GetCatQuery(createdCat.id),
      );

      expect(foundCat).toEqual(createdCat);
    });
  });
});
