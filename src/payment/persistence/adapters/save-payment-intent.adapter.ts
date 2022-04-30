import { Inject } from '@nestjs/common';

import { PaymentIntent } from '@payment/domain/entities';
import { SavePaymentIntentUseCase } from '@payment/domain/use-cases';
import { PaymentIntentMap } from '@payment/persistence/mappers';
import { PaymentIntentModel } from '@payment/persistence/models';

export class SavePaymentIntentAdapter implements SavePaymentIntentUseCase {
  constructor(
    @Inject('PaymentIntentModel')
    private paymentIntentModel: typeof PaymentIntentModel,
  ) {}

  async save(paymentIntent: PaymentIntent): Promise<PaymentIntent> {
    const existIntent = await this.paymentIntentModel.findByPk(
      paymentIntent.id,
    );

    if (existIntent) {
      await existIntent.updateIntent({
        status: paymentIntent.status,
        customerId: paymentIntent.customerId,
        mercantId: paymentIntent.mercantId,
        methodId: paymentIntent.methodId,
        installments: paymentIntent.installments,
        amount: paymentIntent.amount,
        tax: paymentIntent.tax,
      });

      return PaymentIntentMap.toEntity(existIntent);
    }

    const paymentModel = PaymentIntentMap.toModel(paymentIntent);

    await paymentModel.save();

    return PaymentIntentMap.toEntity(paymentModel);
  }
}
