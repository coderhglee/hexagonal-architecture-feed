import { PaymentMethod } from '@payment/domain/entities';

export interface UpdatePaymentMethodUseCase {
  execute(method: PaymentMethod): Promise<PaymentMethod>;
}
