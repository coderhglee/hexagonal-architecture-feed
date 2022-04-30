import { Inject } from '@nestjs/common';

import { NotFoundEntityError } from '@common/errors';

import { PaymentIntent } from '@payment/domain/entities';
import { FindPaymentIntentUseCase } from '@payment/domain/use-cases/find-payment-intent.usecase';
import { PaymentIntentMap } from '@payment/persistence/mappers';
import { PaymentIntentModel } from '@payment/persistence/models';

export class FindPaymentIntentAdapter implements FindPaymentIntentUseCase {
  constructor(
    @Inject('PaymentIntentModel')
    private paymentIntentModel: typeof PaymentIntentModel,
  ) {}

  async findById(intentId: string): Promise<PaymentIntent> {
    const foundPaymentIntent = await this.paymentIntentModel.findByPk(intentId);

    if (!foundPaymentIntent) {
      throw new NotFoundEntityError();
    }

    return PaymentIntentMap.toEntity(foundPaymentIntent);
  }
}
