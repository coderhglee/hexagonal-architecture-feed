import { PaymentIntent } from '@payment/domain/entities';

export interface FindPaymentIntentUseCase {
  findById(methodId: string): Promise<PaymentIntent>;
}
