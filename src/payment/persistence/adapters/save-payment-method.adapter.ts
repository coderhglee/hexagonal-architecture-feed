import { Inject } from '@nestjs/common';

import { PaymentMethod } from '@payment/domain/entities';

import { SavePaymentMethodUseCase } from '@payment/domain/use-cases';
import { PaymentMethodMap } from '@payment/persistence/mappers';
import { PaymentMethodModel } from '@payment/persistence/models';

export class SavePaymentMethodAdapter implements SavePaymentMethodUseCase {
  constructor(
    @Inject('PaymentMethodModel')
    private paymentMethodModel: typeof PaymentMethodModel,
  ) {}

  async save(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
    const existMethod = await this.paymentMethodModel.findByPk(
      paymentMethod.id,
    );

    if (existMethod) {
      await existMethod.updateMethod({
        card: PaymentMethodMap.serializeCard(paymentMethod.card),
        status: paymentMethod.status,
        createdAt: paymentMethod.createdAt,
      });

      return PaymentMethodMap.toEntity(existMethod);
    }

    const paymentMethodModel = PaymentMethodMap.toModel(paymentMethod);

    await paymentMethodModel.save();

    return PaymentMethodMap.toEntity(paymentMethodModel);
  }
}
