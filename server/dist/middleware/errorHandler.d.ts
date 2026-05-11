import type { ErrorRequestHandler } from "express";
/**
 * JSON error handler. Never leaks internals in production — redacted in dev
 * by the logger's secret filter but stack traces are omitted from the response.
 */
export declare const errorHandler: ErrorRequestHandler;
//# sourceMappingURL=errorHandler.d.ts.map