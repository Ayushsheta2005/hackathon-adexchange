import type { RequestHandler } from "express";
/**
 * Rate limit keyed by buyer wallet address when present, else by IP.
 * Reason: demo agents share a loopback IP, so wallet-keyed limiting is the
 * correct blast-radius unit (one misbehaving agent shouldn't starve the rest).
 */
/** Rate limit auction runs per listingId — caps at hackathon's 1–5 Hz cadence. */
export declare function createAuctionRateLimiter(perSecond: number): RequestHandler;
export declare function createBidRateLimiter(perMinute: number): RequestHandler;
/** IP-keyed limit for POST /assistant/chat (demo UI; no wallet in body). */
export declare function createAssistantRateLimiter(perMinute: number): RequestHandler;
//# sourceMappingURL=rateLimit.d.ts.map