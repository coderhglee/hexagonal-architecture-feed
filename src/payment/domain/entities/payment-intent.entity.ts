export enum PaymentIntentStatus {
  REQURIED = 'requried',
  SUCCESSED = 'successed',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export class PaymentIntent {
  id: string;

  status: PaymentIntentStatus;

  customerId: string;

  mercantId: string;

  methodId: string;

  installments: string;

  amount: string;

  tax: string;

  success() {
    this.status = PaymentIntentStatus.SUCCESSED;
  }

  fail() {
    this.status = PaymentIntentStatus.FAILED;
  }

  constructor(
    id: string,
    status: PaymentIntentStatus,
    customerId: string,
    mercantId: string,
    methodId: string,
    installments: string,
    amount: string,
    tax: string,
  ) {
    this.id = id;
    this.status = status;
    this.customerId = customerId;
    this.mercantId = mercantId;
    this.methodId = methodId;
    this.installments = installments;
    this.amount = amount;
    this.tax = tax;
  }
}
