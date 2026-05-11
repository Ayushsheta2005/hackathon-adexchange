import type { RequestHandler } from "express";
/**
 * CORS with an explicit allow-list. CLAUDE.md forbids `*`; the config layer
 * rejects it before we reach this module.
 */
export declare function createCorsMiddleware(allowOrigins: readonly string[]): RequestHandler;
export declare class CorsRejectedError extends Error {
    origin: string;
    constructor(origin: string);
}
//# sourceMappingURL=corsAllowList.d.ts.map