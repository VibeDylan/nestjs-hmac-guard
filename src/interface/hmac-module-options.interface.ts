import { ModuleMetadata } from '@nestjs/common';
import { HmacOptions } from './hmac-options.interface';
/**
 * Asynchronous configuration options for the HMAC module.
 * 
 * This interface follows the NestJS async module pattern,
 * allowing dynamic configuration using a factory function.
 */
export interface HmacModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {

  /**
   * Factory function that returns HMAC configuration options.
   * 
   * This function can be either synchronous or asynchronous.
   * It is typically used to load configuration from:
   * - environment variables
   * - configuration services
   * - external APIs
   * 
   * @param args Injected dependencies specified in the `inject` array
   * @returns HmacOptions or a Promise resolving to HmacOptions
   */
  useFactory: (...args: any[]) => Promise<HmacOptions> | HmacOptions;

  /**
   * List of providers to inject into the `useFactory` function.
   * 
   * Example:
   * inject: [ConfigService]
   */
  inject?: any[];
}