export function getTypeOrNull<T extends Node>(value: unknown, ctor: { new (): T }): T | null {
    return value instanceof ctor ? value : null;
}
