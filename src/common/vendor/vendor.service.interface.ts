export interface RequestPaymentPayload {
  creditNumber: string;
  expireAt: string;
  cvc: string;
  installments: string;
  amount: string;
  tax: string;
}

export interface IVendorService {
  requestPayment(payload: RequestPaymentPayload): Promise<boolean>;
}
