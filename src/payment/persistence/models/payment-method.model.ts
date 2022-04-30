import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
} from 'sequelize-typescript';

interface PaymentMethodId {
  id: string;
}

interface PaymentMethodAttribute {
  card: string;

  status: string;

  createdAt: Date;
}

@Table
export class PaymentMethodModel
  extends Model<PaymentMethodModel>
  implements PaymentMethodId, PaymentMethodAttribute
{
  @PrimaryKey
  @Column
  id: string;

  @Column
  card: string;

  @Column
  status: string;

  @CreatedAt
  createdAt: Date;

  async updateStatus(status: string): Promise<void> {
    this.set({
      status,
    });

    await this.save();
  }

  async updateMethod(attribute: PaymentMethodAttribute) {
    this.set({
      card: attribute.card,
      status: attribute.status,
      createdAt: attribute.createdAt,
    });

    await this.save();
  }
}
