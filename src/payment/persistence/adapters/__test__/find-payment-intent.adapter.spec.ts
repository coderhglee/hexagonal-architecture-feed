import { NotFoundException } from '@nestjs/common';

import * as faker from 'faker';

import { PaymentIntent } from '@payment/domain/entities';
import { PaymentIntentFactory } from '@payment/domain/entities/__test__/payment-intent.factory';
import { FindPaymentIntentAdapter } from '@payment/persistence/adapters/find-payment-intent.adapter';
import { PaymentIntentModel } from '@payment/persistence/models';
import { TestDatabase } from 'test/TestUtil';

describe('FindPaymentIntentAdapter', () => {
  let findPaymentIntentAdapter: FindPaymentIntentAdapter;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    await database.init([PaymentIntentModel]);

    findPaymentIntentAdapter = new FindPaymentIntentAdapter(PaymentIntentModel);
  });

  afterAll(async () => {
    await database.close();
  });

  describe('findById', () => {
    describe('PaymentIntent가 존재하는 경우', () => {
      let intent: PaymentIntent;

      beforeAll(() => {
        intent = PaymentIntentFactory.build();

        const model = PaymentIntentModel.build({
          id: intent.id,
          status: intent.status,
          customerId: intent.customerId,
          mercantId: intent.mercantId,
          methodId: intent.methodId,
          installments: intent.installments,
          amount: intent.amount,
          tax: intent.tax,
        });

        model.save();
      });

      it('PaymentIntent을 id로 찾을수 있다.', async () => {
        const foundIntent = await findPaymentIntentAdapter.findById(intent.id);

        expect(foundIntent).toEqual(expect.objectContaining({ ...intent }));
      });
    });

    describe('PaymentIntent가 존재하지 않으면', () => {
      it('NotFoundException이 발생한다.', async () => {
        await expect(
          findPaymentIntentAdapter.findById(faker.datatype.uuid()),
        ).rejects.toThrow(NotFoundException);
      });
    });
  });
});
