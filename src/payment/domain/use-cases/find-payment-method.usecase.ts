import { PaymentMethod } from '@payment/domain/entities';

export interface FindPaymentMethodUseCase {
  findById(methodId: string): Promise<PaymentMethod>;
}
