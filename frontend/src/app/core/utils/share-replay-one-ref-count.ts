import { MonoTypeOperatorFunction, shareReplay } from "rxjs";

export function shareReplayOneRefCount<T>(): MonoTypeOperatorFunction<T> {
    return shareReplay<T>({
        refCount: true,
        bufferSize: 1,
    });
}
