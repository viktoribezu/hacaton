export interface djangoResponseType<T> {
    count: number;
    next: string;
    prev: string;
    results: T[]
}