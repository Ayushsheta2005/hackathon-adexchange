export function createControlStore(initial = false) {
    let paused = initial;
    const listeners = new Set();
    return {
        isPaused() {
            return paused;
        },
        setPaused(next) {
            if (next === paused)
                return;
            paused = next;
            for (const fn of listeners)
                fn(paused);
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}
//# sourceMappingURL=controlStore.js.map