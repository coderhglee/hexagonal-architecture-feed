import { NotFoundException } from '@nestjs/common';

export class NotFoundEntityError extends NotFoundException {}
