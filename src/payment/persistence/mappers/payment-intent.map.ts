import { PaymentIntent, PaymentIntentStatus } from '@payment/domain/entities';
import { PaymentIntentModel } from '@payment/persistence/models';

export class PaymentIntentMap {
  public static toEntity(model: PaymentIntentModel): PaymentIntent {
    return new PaymentIntent(
      model.id,
      PaymentIntentStatus[model.status.toUpperCase()],
      model.customerId,
      model.mercantId,
      model.methodId,
      model.installments,
      model.amount,
      model.tax,
    );
  }

  public static toModel(paymentIntent: PaymentIntent): PaymentIntentModel {
    return PaymentIntentModel.build({
      id: paymentIntent.id,
      status: paymentIntent.status,
      customerId: paymentIntent.customerId,
      mercantId: paymentIntent.mercantId,
      methodId: paymentIntent.methodId,
      installments: paymentIntent.installments,
      amount: paymentIntent.amount,
      tax: paymentIntent.tax,
    });
  }
}
