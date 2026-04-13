// services/hmac.service.ts
import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { HMAC_MODULE_OPTIONS } from '../constants';
import { HmacOptions } from '../interface/hmac-options.interface';

@Injectable()
export class HmacService {
  constructor(
    @Inject(HMAC_MODULE_OPTIONS)
    private readonly options: HmacOptions,
  ) {}

  verify(payload: Buffer | string, signature: string): boolean {
    const secrets = Array.isArray(this.options.secrets)
      ? this.options.secrets
      : [this.options.secrets];

    return secrets.some((secret) =>
      this.verifyWithSecret(payload, signature, secret),
    );
  }

  private verifyWithSecret(
    payload: Buffer | string,
    signature: string,
    secret: string,
  ): boolean {
    const algo = this.options.algorithm ?? 'sha256';
    const prefix = this.options.signaturePrefix ?? `${algo}=`;

    const hmac = crypto.createHmac(algo, secret);
    hmac.update(payload);

    const digest = `${prefix}${hmac.digest('hex')}`;

    try {
      return crypto.timingSafeEqual(
        Buffer.from(digest),
        Buffer.from(signature),
      );
    } catch {
      return false;
    }
  }
}