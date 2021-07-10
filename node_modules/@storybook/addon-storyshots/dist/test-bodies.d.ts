import 'jest-specific-snapshot';
import { StoryshotsTestMethod, TestMethodOptions } from './api/StoryshotsOptions';
declare type SnapshotsWithOptionsReturnType = (options: Pick<TestMethodOptions, 'story' | 'context' | 'renderTree' | 'snapshotFileName'>) => any;
export declare function snapshotWithOptions(options?: {
    renderer?: any;
    serializer?: any;
} | Function): SnapshotsWithOptionsReturnType;
export declare function multiSnapshotWithOptions(options?: {}): StoryshotsTestMethod;
export declare const shallowSnapshot: StoryshotsTestMethod;
export declare function renderWithOptions(options?: {}): StoryshotsTestMethod;
export declare const renderOnly: StoryshotsTestMethod;
export declare const snapshot: SnapshotsWithOptionsReturnType;
export {};
