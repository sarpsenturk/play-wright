export type Success<T> = {
    success: true;
    data: T;
};

export type Failure<T> = {
    success: false;
    error: T;
};

export type Result<T, E> = Success<T> | Failure<E>;

export type Report = {
    path: string;
};