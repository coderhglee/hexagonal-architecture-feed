import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

interface PaymentIntentId {
  id: string;
}

interface PaymentIntentAttribute {
  status: string;

  customerId: string;

  mercantId: string;

  methodId: string;

  installments: string;

  amount: string;

  tax: string;
}

@Table
export class PaymentIntentModel
  extends Model<PaymentIntentModel>
  implements PaymentIntentId, PaymentIntentAttribute
{
  @PrimaryKey
  @Column
  id: string;

  @Column
  status: string;

  @Column
  customerId: string;

  @Column
  mercantId: string;

  @Column
  methodId: string;

  @Column
  installments: string;

  @Column
  amount: string;

  @Column
  tax: string;

  async updateIntent(attribute: PaymentIntentAttribute) {
    this.set({
      status: attribute.status,
      customerId: attribute.customerId,
      mercantId: attribute.mercantId,
      methodId: attribute.methodId,
      installments: attribute.installments,
      amount: attribute.amount,
      tax: attribute.tax,
    });

    await this.save();
  }
}
