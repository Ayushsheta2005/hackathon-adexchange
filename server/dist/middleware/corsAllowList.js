import cors from "cors";
/**
 * CORS with an explicit allow-list. CLAUDE.md forbids `*`; the config layer
 * rejects it before we reach this module.
 */
export function createCorsMiddleware(allowOrigins) {
    const allowed = new Set(allowOrigins);
    return cors({
        origin(origin, cb) {
            // Same-origin requests (curl, server-to-server) have no Origin header — allow.
            if (!origin)
                return cb(null, true);
            if (allowed.has(origin))
                return cb(null, true);
            return cb(new CorsRejectedError(origin), false);
        },
        credentials: true,
    });
}
export class CorsRejectedError extends Error {
    origin;
    constructor(origin) {
        super(`Origin ${origin} is not in CORS_ALLOW_ORIGINS`);
        this.origin = origin;
        this.name = "CorsRejectedError";
    }
}
//# sourceMappingURL=corsAllowList.js.map