import * as faker from 'faker';

import { CreateCatCommand } from '../create-cat.command';
import { CreateCatHandler } from '../create-cat.handler';
import { TestDatabase } from '../../../../../test/TestUtil';
import { CatsRepository } from '../../../persistence/repository/cat.repository';
import { CatService } from '../../../domain/service/cat.service';
import { EventPublisher } from '../../../../common/message/event-publisher';
import { CatModel } from '../../../persistence/models/cat.model';

describe('CreateCatHandler', () => {
  let createCatHandler: CreateCatHandler;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    database.init();

    const catRepository = new CatsRepository(CatModel);

    const catService = new CatService(
      catRepository,
      new EventPublisher({
        publish: jest.fn(),
        publishAll: jest.fn(),
      } as any),
    );

    createCatHandler = new CreateCatHandler(catService);
  });

  afterAll(async () => {
    database.close();
  });

  describe('execute', () => {
    let createCatCommand: CreateCatCommand;

    beforeAll(() => {
      createCatCommand = new CreateCatCommand(
        faker.name.firstName(),
        faker.datatype.number(),
        faker.address.cityName(),
      );
    });

    it('cat을 생성 할 수 있다.', async () => {
      const createdCat = await createCatHandler.execute(createCatCommand);

      expect(createdCat).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          ...createCatCommand,
        }),
      );
    });
  });
});
