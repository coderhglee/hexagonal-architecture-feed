import { PaymentMethod } from '@payment/domain/entities';
import {
  FindPaymentMethodUseCase,
  LockPaymentMethodUseCase,
} from '@payment/domain/use-cases';
import { UpdatePaymentMethodUseCase } from '@payment/domain/use-cases/update-payment-method-state.usecase';

export class LockPaymentMethodService implements LockPaymentMethodUseCase {
  constructor(
    private readonly findPaymentMetohdUseCase: FindPaymentMethodUseCase,
    private readonly updatePaymentMethodUseCase: UpdatePaymentMethodUseCase,
  ) {}

  async lock(methodId: string): Promise<PaymentMethod> {
    const foundPaymentMethod = await this.findPaymentMetohdUseCase.findById(
      methodId,
    );

    foundPaymentMethod.lock();

    return this.updatePaymentMethodUseCase.execute(foundPaymentMethod);
  }

  async unlock(methodId: string): Promise<PaymentMethod> {
    const foundPaymentMethod = await this.findPaymentMetohdUseCase.findById(
      methodId,
    );

    foundPaymentMethod.unlock();

    return this.updatePaymentMethodUseCase.execute(foundPaymentMethod);
  }
}
