import { PaymentMethod } from '../entities/payment-method.entity';

export interface SavePaymentMethodUseCase {
  save(method: PaymentMethod): Promise<PaymentMethod>;
}
