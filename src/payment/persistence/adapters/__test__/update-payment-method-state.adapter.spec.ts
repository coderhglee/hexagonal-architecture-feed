import { UpdatePaymentMethodStateAdapter } from '../update-payment-method-state.adapter';

import { PaymentMethodFactory } from '../../../domain/entities/__test__/payment-method.factory';

import { SavePaymentMethodAdapter } from '../save-payment-method.adapter';

import { PaymentMethod, PaymentMethodStatus } from '@payment/domain/entities';
import { PaymentMethodModel } from '@payment/persistence/models';
import { TestDatabase } from 'test/TestUtil';

describe('UpdatePaymentMethodAdapter', () => {
  let updatePaymentMethodAdapter: UpdatePaymentMethodStateAdapter;
  let savePaymentMethodAdapter: SavePaymentMethodAdapter;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    await database.init([PaymentMethodModel]);

    savePaymentMethodAdapter = new SavePaymentMethodAdapter(PaymentMethodModel);
    updatePaymentMethodAdapter = new UpdatePaymentMethodStateAdapter(
      PaymentMethodModel,
    );
  });

  afterAll(async () => {
    await database.close();
  });

  describe('execute', () => {
    describe('PaymentMethod가 존재 하는 경우', () => {
      let method: PaymentMethod;

      beforeAll(async () => {
        const methodAttr = PaymentMethodFactory.build();

        method = new PaymentMethod(
          methodAttr.id,
          methodAttr.card,
          methodAttr.status,
          methodAttr.createdAt,
        );

        await savePaymentMethodAdapter.save(method);
      });

      it('PaymentMethod의 상태를 수정 할 수 있다.', async () => {
        method.lock();

        const updatedMethod = await updatePaymentMethodAdapter.execute(method);

        expect(updatedMethod.status).toEqual(PaymentMethodStatus.LOCKED);
      });
    });

    describe('PaymentMethod가 존재 하지 않는 경우', () => {
      it('Error가 발생한다.', async () => {
        await expect(
          updatePaymentMethodAdapter.execute(PaymentMethodFactory.build()),
        ).rejects.toThrow(Error);
      });
    });
  });
});
