// guards/hmac.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HmacService } from '../services/hmac.service';

@Injectable()
export class HmacGuard implements CanActivate {
  constructor(
    private readonly hmacService: HmacService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const headerName =
      this.reflector.get<string>('hmac:header', context.getHandler()) ||
      'x-signature';

    const signature = request.headers[headerName];

    if (!signature) {
      throw new UnauthorizedException('Missing signature');
    }

    // 🔥 raw body prioritaire
    const payload = request.rawBody || JSON.stringify(request.body);

    const isValid = this.hmacService.verify(payload, signature);

    if (!isValid) {
      throw new UnauthorizedException('Invalid signature');
    }

    return true;
  }
}