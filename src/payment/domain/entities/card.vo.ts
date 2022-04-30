export class Card {
  creditNumber: string;

  expireMonth: string;

  expireYear: string;

  cvc: string;

  constructor(
    creditNumber: string,
    expireMonth: string,
    expireYear: string,
    cvc: string,
  ) {
    this.creditNumber = creditNumber;
    this.expireMonth = expireMonth;
    this.expireYear = expireYear;
    this.cvc = cvc;
  }
}
