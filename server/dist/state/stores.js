export function createListingStore() {
    const map = new Map();
    return {
        async add(listing) {
            map.set(listing.listingId, listing);
        },
        async list() {
            return [...map.values()];
        },
        async get(id) {
            return map.get(id);
        },
        async remove(id) {
            map.delete(id);
        },
    };
}
export function createBidStore() {
    let queue = [];
    return {
        async add(bid) {
            queue.push(bid);
        },
        async list() {
            return [...queue];
        },
        async drain() {
            const out = queue;
            queue = [];
            return out;
        },
    };
}
export function createSettlementStore() {
    const list = [];
    return {
        async add(receipt) {
            list.push(receipt);
        },
        async list() {
            return [...list];
        },
        async count() {
            return list.length;
        },
    };
}
//# sourceMappingURL=stores.js.map