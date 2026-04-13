/**
 * Configuration options for HMAC signature verification.
 */
export interface HmacOptions {
  /**
   * Secret key(s) used to generate and validate the HMAC signature.
   * 
   * - Provide a single string for one secret
   * - Provide an array of strings to support secret rotation
   */
  secrets: string | string[];

  /**
   * Name of the HTTP header containing the HMAC signature.
   * 
   * @default 'x-signature'
   */
  headerName?: string;

  /**
   * Hashing algorithm used to compute the HMAC signature.
   * 
   * Supported values:
   * - 'sha256'
   * - 'sha512'
   * 
   * @default 'sha256'
   */
  algorithm?: 'sha256' | 'sha512';

  /**
   * Optional prefix included in the signature value.
   * 
   * Commonly used formats:
   * - 'sha256='
   * - 'sha512='
   * 
   * Example:
   * If the header value is "sha256=abc123", the prefix is "sha256=".
   */
  signaturePrefix?: string;
}