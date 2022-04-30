import { PaymentIntentStatus } from '@payment/domain/entities';

export interface CreatePaymentIntentCommand {
  id: string;

  status: PaymentIntentStatus;

  customerId: string;

  mercantId: string;

  methodId: string;

  installments: string;

  amount: string;

  tax: string;
}
