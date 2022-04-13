import { NotFoundException } from '@nestjs/common';
import * as faker from 'faker';

import { TestDatabase } from '../../../../../test/TestUtil';
import { CatModel } from '../../../persistence/models/cat.model';
import { CatsRepository } from '../../../persistence/repository/cat.repository';

import { Cat } from '../../entities/cat.entity';
import { CatFactory } from '../../entities/__test__/cat.factory';
import { CatService } from '../cat.service';

describe('CatService', () => {
  let catService: CatService;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    database.init();

    const catRepository = new CatsRepository(CatModel);

    catService = new CatService(catRepository, {
      publish: jest.fn(),
      publishAll: jest.fn(),
    } as any);
  });

  afterAll(async () => {
    database.close();
  });

  describe('create', () => {
    let cat: Cat;

    beforeAll(() => {
      cat = CatFactory.build();
    });

    it('cat을 생성 할 수 있다.', async () => {
      const createdCat = await catService.create(cat.name, cat.age, cat.breed);

      expect(createdCat).toEqual(
        expect.objectContaining({
          id: expect.any(String),
        }),
      );
    });
  });

  describe('findById', () => {
    describe('cat이 존재하면', () => {
      let existCat: Cat;

      beforeAll(async () => {
        const cat = CatFactory.build();

        existCat = await catService.create(cat.name, cat.age, cat.breed);
      });

      it('cat을 id로 찾을수 있다.', async () => {
        const foundCat = await catService.findById(existCat.id);

        expect(foundCat).toEqual(expect.objectContaining({ ...existCat }));
      });
    });

    describe('cat이 존재하지 않으면', () => {
      it('NotFoundException이 발생한다.', async () => {
        await expect(
          catService.findById(faker.datatype.uuid()),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
