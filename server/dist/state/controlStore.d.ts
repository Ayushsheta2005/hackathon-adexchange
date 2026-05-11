/**
 * In-memory pause/resume flag for the demo. Subscribers are notified only
 * when the flag actually changes — repeated `setPaused(true)` calls collapse
 * into a single `control.changed` SSE event so the UI doesn't churn.
 */
export interface ControlStore {
    isPaused(): boolean;
    setPaused(paused: boolean): void;
    /** Returns an unsubscribe function. */
    subscribe(listener: (paused: boolean) => void): () => void;
}
export declare function createControlStore(initial?: boolean): ControlStore;
//# sourceMappingURL=controlStore.d.ts.map