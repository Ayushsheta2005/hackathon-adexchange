import { FLOOR_PRICE_MIN_USDC } from "@ade/shared";
import { gteUsdc, gtUsdc } from "./money.js";
/** True iff `bid.bidAmountUsdc` clears `floorUsdc`. */
export function clearsFloor(bid, floorUsdc) {
    return gteUsdc(bid.bidAmountUsdc, floorUsdc);
}
/** Runtime sanity: floor cannot be below the hackathon's min tick. */
export function assertValidFloor(floorUsdc) {
    if (!gtUsdc(floorUsdc, "0.000000") && floorUsdc !== "0") {
        throw new Error(`floorUsdc must be a non-negative decimal, got ${floorUsdc}`);
    }
    if (!gteUsdc(floorUsdc, FLOOR_PRICE_MIN_USDC)) {
        throw new Error(`floorUsdc ${floorUsdc} is below FLOOR_PRICE_MIN_USDC (${FLOOR_PRICE_MIN_USDC})`);
    }
}
export function filterBidsAboveFloor(bids, floorUsdc) {
    return bids.filter((b) => clearsFloor(b, floorUsdc));
}
//# sourceMappingURL=floor.js.map