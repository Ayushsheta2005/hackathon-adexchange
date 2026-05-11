export function createInMemoryNonceStore() {
    const seen = new Map();
    const keyFor = (depositor) => depositor.toLowerCase();
    return {
        async claim(depositor, nonce) {
            const key = keyFor(depositor);
            let set = seen.get(key);
            if (!set) {
                set = new Set();
                seen.set(key, set);
            }
            if (set.has(nonce))
                return false;
            set.add(nonce);
            return true;
        },
        async has(depositor, nonce) {
            return seen.get(keyFor(depositor))?.has(nonce) ?? false;
        },
        async size() {
            let total = 0;
            for (const set of seen.values())
                total += set.size;
            return total;
        },
    };
}
//# sourceMappingURL=store.js.map