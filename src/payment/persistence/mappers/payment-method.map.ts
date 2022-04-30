import {
  Card,
  PaymentMethod,
  PaymentMethodStatus,
} from '@payment/domain/entities';
import { PaymentMethodModel } from '@payment/persistence/models';

export class PaymentMethodMap {
  public static toEntity(
    paymentMethodModel: PaymentMethodModel,
  ): PaymentMethod {
    return new PaymentMethod(
      paymentMethodModel.id,
      this.deserializeCard(paymentMethodModel.card),
      PaymentMethodStatus[paymentMethodModel.status.toUpperCase()],
      paymentMethodModel.createdAt,
    );
  }

  public static toModel(paymentMethod: PaymentMethod): PaymentMethodModel {
    return PaymentMethodModel.build({
      id: paymentMethod.id,
      card: this.serializeCard(paymentMethod.card),
      status: paymentMethod.status,
      createdAt: paymentMethod.createdAt,
    });
  }

  public static serializeCard(card: Card): string {
    return `${card.creditNumber}|${card.expireMonth}/${card.expireYear}|${card.cvc}`;
  }

  public static deserializeCard(serializedCard: string): Card {
    const data = serializedCard.split('|');

    if (data.length !== 3) {
      throw new Error();
    }

    const expireDate = data[1].split('/');

    if (expireDate.length !== 2) {
      throw new Error();
    }

    return new Card(data[0], expireDate[0], expireDate[1], data[2]);
  }
}
