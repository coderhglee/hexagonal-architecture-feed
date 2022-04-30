import { Inject } from '@nestjs/common';

import { NotExistPaymentMethodError } from '@common/errors';

import { PaymentMethod } from '@payment/domain/entities';
import { PaymentMethodMap } from '@payment/persistence/mappers';
import { PaymentMethodModel } from '@payment/persistence/models';
import { FindPaymentMethodUseCase } from '@payment/domain/use-cases';

export class FindPaymentMethodAdapter implements FindPaymentMethodUseCase {
  constructor(
    @Inject('PaymentMethodModel')
    private paymentMethodModel: typeof PaymentMethodModel,
  ) {}

  async findById(intentId: string): Promise<PaymentMethod> {
    const foundPaymentMethod = await this.paymentMethodModel.findByPk(intentId);

    if (!foundPaymentMethod) {
      throw new NotExistPaymentMethodError();
    }

    return PaymentMethodMap.toEntity(foundPaymentMethod);
  }
}
