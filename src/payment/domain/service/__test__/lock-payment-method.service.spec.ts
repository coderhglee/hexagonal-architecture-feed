import * as faker from 'faker';

import { PaymentMethod, PaymentMethodStatus } from '@payment/domain/entities';
import { PaymentMethodModel } from '@payment/persistence/models';
import { TestDatabase } from 'test/TestUtil';
import {
  FindPaymentMethodAdapter,
  SavePaymentMethodAdapter,
  UpdatePaymentMethodStateAdapter,
} from '@payment/persistence/adapters';
import { PaymentMethodFactory } from '@payment/domain/entities/__test__/payment-method.factory';
import { LockPaymentMethodService } from '@payment/domain/service/lock-payment-method.service';
import { NotExistPaymentMethodError } from '@common/errors';

describe('UpdatePaymentMethodAdapter', () => {
  let updatePaymentMethodAdapter: UpdatePaymentMethodStateAdapter;
  let savePaymentMethodAdapter: SavePaymentMethodAdapter;
  let findPaymentMethodAdapter: FindPaymentMethodAdapter;
  let lockPaymentMethodService: LockPaymentMethodService;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    await database.init([PaymentMethodModel]);

    savePaymentMethodAdapter = new SavePaymentMethodAdapter(PaymentMethodModel);
    findPaymentMethodAdapter = new FindPaymentMethodAdapter(PaymentMethodModel);
    updatePaymentMethodAdapter = new UpdatePaymentMethodStateAdapter(
      PaymentMethodModel,
    );

    lockPaymentMethodService = new LockPaymentMethodService(
      findPaymentMethodAdapter,
      updatePaymentMethodAdapter,
    );
  });

  afterAll(async () => {
    await database.close();
  });

  describe('lock', () => {
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

      it('PaymentMethod를 lock 할 수 있다.', async () => {
        const updatedMethod = await lockPaymentMethodService.lock(method.id);

        expect(updatedMethod.status).toEqual(PaymentMethodStatus.LOCKED);
      });
    });

    describe('PaymentMethod가 이미 lock 되어 있는 경우', () => {
      let method: PaymentMethod;

      beforeAll(async () => {
        const methodAttr = PaymentMethodFactory.build({
          status: PaymentMethodStatus.LOCKED,
        });

        method = new PaymentMethod(
          methodAttr.id,
          methodAttr.card,
          methodAttr.status,
          methodAttr.createdAt,
        );

        await savePaymentMethodAdapter.save(method);
      });

      it('Error가 발생 한다.', async () => {
        await expect(lockPaymentMethodService.lock(method.id)).rejects.toThrow(
          Error,
        );
      });
    });

    describe('PaymentMethod가 존재 하지 않는 경우', () => {
      it('NotExistPaymentMethodError가 발생한다.', async () => {
        await expect(
          lockPaymentMethodService.lock(faker.datatype.uuid()),
        ).rejects.toThrow(NotExistPaymentMethodError);
      });
    });
  });
});
