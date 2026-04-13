import { SetMetadata } from '@nestjs/common';

export const HmacHeader = (header: string) =>
  SetMetadata('hmac:header', header);