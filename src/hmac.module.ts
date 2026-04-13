// hmac.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { HmacService } from './services/hmac.service';
import { HMAC_MODULE_OPTIONS } from './constants';
import { HmacOptions } from './interface/hmac-options.interface';
import { HmacModuleAsyncOptions } from './interface/hmac-module-options.interface';

@Module({})
export class HmacModule {
  static forRoot(options: HmacOptions): DynamicModule {
    return {
      module: HmacModule,
      providers: [
        {
          provide: HMAC_MODULE_OPTIONS,
          useValue: options,
        },
        HmacService,
      ],
      exports: [HmacService],
    };
  }

  static forRootAsync(options: HmacModuleAsyncOptions): DynamicModule {
    return {
      module: HmacModule,
      imports: options.imports || [],
      providers: [
        {
          provide: HMAC_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        HmacService,
      ],
      exports: [HmacService],
    };
  }
}