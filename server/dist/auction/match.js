/**
 * Match a listing to the subset of bids whose targeting matches the listing's
 * ad type / format / size and none of the listing's contextual exclusions.
 * Pure function — no side effects, no DB writes, no logging.
 */
export function matchBidsToListing(listing, bids) {
    return bids.filter((b) => isCompatible(listing, b));
}
function isCompatible(listing, bid) {
    if (bid.targeting.adType !== listing.adType)
        return false;
    if (bid.targeting.format !== listing.format)
        return false;
    if (bid.targeting.size !== listing.size)
        return false;
    // Listing-level contextual exclusion: reject if any bid context tag matches.
    const exclusions = new Set(listing.contextualExclusions);
    return !bid.targeting.contextTags.some((tag) => exclusions.has(tag));
}
//# sourceMappingURL=match.js.map