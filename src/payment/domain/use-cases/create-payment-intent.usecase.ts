import { PaymentIntent } from '@payment/domain/entities';
import { CreatePaymentIntentCommand } from '@payment/domain/use-cases/create-payment-intent.command';

export interface CreatePaymentIntentUseCase {
  execute(paymentIntent: CreatePaymentIntentCommand): Promise<PaymentIntent>;
}
