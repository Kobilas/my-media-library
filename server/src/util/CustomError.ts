export class NotFoundError extends Error {
    constructor(...params: Array<string>) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        };

        this.name = "NotFoundError";
    }
}

export class ExistsError extends Error {
    constructor(...params: Array<string>) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ExistsError);
        };

        this.name = "ExistsError";
    }
}