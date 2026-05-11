/**
 * USDC decimal-string ⇄ 6-decimal BigInt conversion.
 *
 * Reason: floats silently mis-round at sub-cent scale. All auction math,
 * floor comparisons, and clearing-price computation go through this helper.
 * Inputs from HTTP boundaries are already validated as `/^\d+(\.\d{1,6})?$/`
 * by zod — we trust that shape here.
 */
const UNITS_PER_USDC = 1000000n;
export function toAtomic(usdc) {
    const [whole = "0", frac = ""] = usdc.split(".");
    const padded = (frac + "000000").slice(0, 6);
    return BigInt(whole) * UNITS_PER_USDC + BigInt(padded);
}
export function fromAtomic(atomic) {
    const whole = atomic / UNITS_PER_USDC;
    const frac = atomic % UNITS_PER_USDC;
    return `${whole.toString()}.${frac.toString().padStart(6, "0")}`;
}
export function addUsdc(a, b) {
    return fromAtomic(toAtomic(a) + toAtomic(b));
}
export function minUsdc(a, b) {
    return toAtomic(a) <= toAtomic(b) ? normalize(a) : normalize(b);
}
export function gtUsdc(a, b) {
    return toAtomic(a) > toAtomic(b);
}
export function gteUsdc(a, b) {
    return toAtomic(a) >= toAtomic(b);
}
function normalize(usdc) {
    return fromAtomic(toAtomic(usdc));
}
//# sourceMappingURL=money.js.map