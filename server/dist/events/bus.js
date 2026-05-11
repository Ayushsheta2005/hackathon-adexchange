import { EventEmitter } from "node:events";
export function createEventBus() {
    const ee = new EventEmitter();
    return {
        emit(event, payload) {
            ee.emit(event, payload);
        },
        on(event, handler) {
            ee.on(event, handler);
            return () => ee.off(event, handler);
        },
    };
}
//# sourceMappingURL=bus.js.map