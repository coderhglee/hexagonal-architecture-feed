import { Inject } from '@nestjs/common';

import { UpdatePaymentMethodUseCase } from '../../domain/use-cases';
import { PaymentMethodModel } from '../models';

import { PaymentMethod } from '@payment/domain/entities';

export class UpdatePaymentMethodStateAdapter
  implements UpdatePaymentMethodUseCase
{
  constructor(
    @Inject('PaymentMethodModel')
    private paymentMethodModel: typeof PaymentMethodModel,
  ) {}

  async execute(method: PaymentMethod): Promise<PaymentMethod> {
    const [count] = await this.paymentMethodModel.update(
      {
        status: method.status,
      },
      { where: { id: method.id } },
    );

    if (count !== 1) {
      throw Error();
    }

    return method;
  }
}
