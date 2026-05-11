import type { AdInventoryListing, BidRequest, SettlementReceipt } from "@ade/shared";
/**
 * In-memory application stores for the scaffold. Real persistence is a later
 * PRP. The interfaces here mean a swap will be one implementation per store.
 */
export interface ListingStore {
    add(listing: AdInventoryListing): Promise<void>;
    list(): Promise<AdInventoryListing[]>;
    get(listingId: string): Promise<AdInventoryListing | undefined>;
    remove(listingId: string): Promise<void>;
}
export interface BidStore {
    add(bid: BidRequest): Promise<void>;
    list(): Promise<BidRequest[]>;
    drain(): Promise<BidRequest[]>;
}
export interface SettlementStore {
    add(receipt: SettlementReceipt): Promise<void>;
    list(): Promise<SettlementReceipt[]>;
    count(): Promise<number>;
}
export declare function createListingStore(): ListingStore;
export declare function createBidStore(): BidStore;
export declare function createSettlementStore(): SettlementStore;
//# sourceMappingURL=stores.d.ts.map