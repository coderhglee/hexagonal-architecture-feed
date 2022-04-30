import { PaymentIntent } from '../entities/payment-intent.entity';

export interface SavePaymentIntentUseCase {
  save(paymentIntent: PaymentIntent): Promise<PaymentIntent>;
}
