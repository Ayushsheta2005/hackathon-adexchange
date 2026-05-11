import { initiateDeveloperControlledWalletsClient } from "@circle-fin/developer-controlled-wallets";
import type { CircleSdkAdapter } from "./circle.js";
import type { WalletsConfig } from "./config.js";
type SdkClient = ReturnType<typeof initiateDeveloperControlledWalletsClient>;
/**
 * Real Circle-SDK-backed adapter. Every method maps SDK response shape to the
 * zod-parsed adapter shape consumed by `createCircleClient`. Callers never
 * see a `response.data.*` shape — the zod parse in `circle.ts` enforces it.
 */
export declare function createRealCircleSdk(config: WalletsConfig): CircleSdkAdapter;
export declare function buildAdapter(client: SdkClient): CircleSdkAdapter;
/**
 * Coerce whatever Circle returns for `tokenBalances[].amount` into the
 * `^\d+(?:\.\d{1,6})?$` shape that `UsdcAmountSchema` (shared) expects.
 * Reason: the SDK sometimes returns more than 6 fractional digits or
 * scientific notation on long-tail token accounts — both would make the
 * downstream zod parse throw, which breaks `getBalance` entirely.
 */
export declare function normalizeUsdcAmount(raw: string | undefined | null): string;
export {};
//# sourceMappingURL=circleAdapter.d.ts.map