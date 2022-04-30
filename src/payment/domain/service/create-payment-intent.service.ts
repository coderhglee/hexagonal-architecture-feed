import {
  NotExistPaymentMethodError,
  RequestPaymentByVendorError,
} from '@common/errors';
import { IVendorService } from '@common/vendor';
import { PaymentIntent } from '@payment/domain/entities';
import {
  CreatePaymentIntentCommand,
  CreatePaymentIntentUseCase,
  SavePaymentIntentUseCase,
  LockPaymentMethodUseCase,
} from '@payment/domain/use-cases';

export class CreatePaymentIntentService implements CreatePaymentIntentUseCase {
  constructor(
    private readonly savePaymentIntentUseCase: SavePaymentIntentUseCase,
    private readonly updatePaymentMethodStateUseCase: LockPaymentMethodUseCase,
    private readonly verdorService: IVendorService,
  ) {}

  async execute(command: CreatePaymentIntentCommand): Promise<PaymentIntent> {
    const paymentIntent = new PaymentIntent(
      command.id,
      command.status,
      command.customerId,
      command.mercantId,
      command.mercantId,
      command.installments,
      command.amount,
      command.tax,
    );

    try {
      const createdPaymentIntent = await this.savePaymentIntentUseCase.save(
        paymentIntent,
      );

      const lockedPaymentMethod =
        await this.updatePaymentMethodStateUseCase.lock(
          createdPaymentIntent.methodId,
        );

      const resultRequestPayment = await this.verdorService.requestPayment({
        creditNumber: lockedPaymentMethod.card.creditNumber,
        expireAt: `${lockedPaymentMethod.card.expireMonth}${lockedPaymentMethod.card.expireYear}`,
        cvc: lockedPaymentMethod.card.cvc,
        installments: paymentIntent.installments,
        amount: paymentIntent.amount,
        tax: paymentIntent.tax,
      });

      if (!resultRequestPayment) {
        throw new RequestPaymentByVendorError();
      }

      createdPaymentIntent.success();

      const successedPaymentIntent = await this.savePaymentIntentUseCase.save(
        createdPaymentIntent,
      );

      await this.updatePaymentMethodStateUseCase.unlock(lockedPaymentMethod.id);

      return successedPaymentIntent;
    } catch (error) {
      if (!(error instanceof NotExistPaymentMethodError)) {
        await this.updatePaymentMethodStateUseCase.unlock(command.methodId);
      }

      paymentIntent.fail();

      await this.savePaymentIntentUseCase.save(paymentIntent);

      throw error;
    }
  }
}
