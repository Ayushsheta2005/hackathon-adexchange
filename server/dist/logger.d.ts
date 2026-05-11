import pino, { type Logger } from "pino";
export declare function createLogger(level?: string): Logger;
/**
 * Default logger, safe for import at module load. It reads nothing from
 * process.env directly — callers that want a configured level call
 * `createLogger(config.LOG_LEVEL)` with their own config.
 */
export declare const logger: pino.Logger;
//# sourceMappingURL=logger.d.ts.map