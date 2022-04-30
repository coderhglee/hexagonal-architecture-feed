import { NotFoundException } from '@nestjs/common';

export class NotExistPaymentMethodError extends NotFoundException {}
