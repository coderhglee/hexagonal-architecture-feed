import { PaymentIntent, PaymentIntentStatus } from '@payment/domain/entities';
import { PaymentIntentFactory } from '@payment/domain/entities/__test__/payment-intent.factory';
import { PaymentIntentModel } from '@payment/persistence/models';
import { TestDatabase } from 'test/TestUtil';
import { SavePaymentIntentAdapter } from '@payment/persistence/adapters/save-payment-intent.adapter';

describe('SavePaymentIntentAdapter', () => {
  let savePaymentIntentAdapter: SavePaymentIntentAdapter;
  let database: TestDatabase;

  beforeAll(async () => {
    database = new TestDatabase();
    await database.init([PaymentIntentModel]);

    savePaymentIntentAdapter = new SavePaymentIntentAdapter(PaymentIntentModel);
  });

  afterAll(async () => {
    await database.close();
  });

  describe('save', () => {
    describe('PaymentIntent가 존재하지 않는 경우', () => {
      let intent: PaymentIntent;

      beforeAll(() => {
        const intentAttr = PaymentIntentFactory.build();

        intent = new PaymentIntent(
          intentAttr.id,
          intentAttr.status,
          intentAttr.customerId,
          intentAttr.mercantId,
          intentAttr.methodId,
          intentAttr.installments,
          intentAttr.amount,
          intentAttr.tax,
        );
      });

      it('새로운 PaymentIntent을 생성할 수 있다.', async () => {
        const foundIntent = await savePaymentIntentAdapter.save(intent);

        expect(foundIntent).toEqual(expect.objectContaining({ ...intent }));
      });
    });

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

      it('기존 PaymentIntent을 수정할 수 있다.', async () => {
        const updateIntent = new PaymentIntent(
          intent.id,
          PaymentIntentStatus.SUCCESSED,
          intent.customerId,
          intent.mercantId,
          intent.methodId,
          intent.installments,
          intent.amount,
          intent.tax,
        );

        const savedIntent = await savePaymentIntentAdapter.save(updateIntent);

        expect(savedIntent).toEqual(
          expect.objectContaining({ ...updateIntent }),
        );
      });
    });
  });
});
