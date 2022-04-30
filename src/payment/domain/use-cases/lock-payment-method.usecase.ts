import { PaymentMethod } from '@payment/domain/entities';

export interface LockPaymentMethodUseCase {
  lock(methodId: string): Promise<PaymentMethod>;

  unlock(methodId: string): Promise<PaymentMethod>;
}
