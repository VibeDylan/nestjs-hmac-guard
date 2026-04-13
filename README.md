# 🔐 nestjs-hmac-guard

A production-ready **HMAC authentication guard for NestJS**.
Secure your webhooks, internal APIs, and service-to-service communication with ease.

---

## ✨ Features

* 🔐 HMAC signature verification (SHA-256 / SHA-512)
* 🧩 NestJS **Guard + Dynamic Module**
* 🔄 Multi-secret support (key rotation)
* ⚡ Raw body support (Stripe / GitHub compatible)
* 🛡️ Timing-safe comparison (prevents timing attacks)
* ⚙️ Fully configurable (headers, prefix, algorithm)
* 🧠 Clean and idiomatic NestJS design

---

## 📦 Installation

```bash
npm install nestjs-hmac-guard
```

---

## 🚀 Quick Start

### 1. Register the module

```ts
import { HmacModule } from 'nestjs-hmac-guard';

@Module({
  imports: [
    HmacModule.forRoot({
      secrets: ['your-secret'],
    }),
  ],
})
export class AppModule {}
```

---

### 2. Protect a route

```ts
import { UseGuards } from '@nestjs/common';
import { HmacGuard } from 'nestjs-hmac-guard';

@UseGuards(HmacGuard)
@Post('webhook')
handleWebhook() {
  return 'OK';
}
```

---

## 🔐 How it works

The client generates a signature:

```text
signature = HMAC(secret, payload)
```

Your server verifies:

* ✔️ The request comes from a trusted source
* ✔️ The payload has not been modified

---

## ⚙️ Configuration

### Sync configuration

```ts
HmacModule.forRoot({
  secrets: ['secret1', 'secret2'],
  algorithm: 'sha256',
  signaturePrefix: 'sha256=',
});
```

---

### Async configuration (recommended)

```ts
HmacModule.forRootAsync({
  useFactory: (configService) => ({
    secrets: configService.get('HMAC_SECRETS'),
  }),
  inject: [ConfigService],
});
```

---

## 🧩 Options

| Option            | Type                   | Default       | Description                        |
| ----------------- | ---------------------- | ------------- | ---------------------------------- |
| `secrets`         | `string \| string[]`   | **required**  | Secret(s) used to verify signature |
| `algorithm`       | `'sha256' \| 'sha512'` | `sha256`      | Hash algorithm                     |
| `signaturePrefix` | `string`               | `sha256=`     | Prefix used in header              |
| `headerName`      | `string`               | `x-signature` | Header containing signature        |

---

## 🧪 Custom Header per Route

```ts
import { HmacHeader } from 'nestjs-hmac-guard';

@UseGuards(HmacGuard)
@HmacHeader('x-hub-signature-256')
@Post('github-webhook')
handleGithubWebhook() {}
```

---

## ⚠️ Raw Body (IMPORTANT)

To properly verify signatures (especially for webhooks), you must access the **raw request body**.

### Express setup

```ts
import * as express from 'express';

app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    },
  }),
);
```

---

## 🔌 Use Cases

* 🔔 Webhooks (Stripe, GitHub, Shopify)
* 🔗 Service-to-service authentication
* 📡 Internal/private APIs
* 🛡️ Secure event ingestion endpoints

---

## 🛡️ Security

This package protects against:

* ❌ Request spoofing
* ❌ Payload tampering
* ❌ Timing attacks

> ⚠️ For full protection against replay attacks, consider adding a timestamp + nonce layer.

---

## 🧠 Advanced Example (GitHub Webhook)

```ts
@UseGuards(HmacGuard)
@HmacHeader('x-hub-signature-256')
@Post('github')
handleGithubEvent(@Req() req) {
  console.log(req.body);
}
```

---

## 🧪 Testing Signature Example

```ts
import * as crypto from 'crypto';

const secret = 'your-secret';
const payload = JSON.stringify({ hello: 'world' });

const signature =
  'sha256=' +
  crypto.createHmac('sha256', secret).update(payload).digest('hex');
```

---

## 🧱 Roadmap

* [ ] Replay attack protection (timestamp + nonce)
* [ ] Fastify adapter support
* [ ] Guard factory (per-route config)
* [ ] CLI generator
* [ ] Extended provider integrations (Stripe, GitHub presets)

---

## 🤝 Contributing

PRs are welcome!
Please open an issue first to discuss changes.

---

## 📄 License

MIT

---

## ⭐ Support

If you find this package useful, consider giving it a star ⭐ on GitHub.
