import { ValidationError } from 'joi';

export class HTTPError extends Error {
    public status!: number;
}

export class SchemaValidationError extends HTTPError {
    constructor(validationError: ValidationError) {
        super();
        this.message = `Data does not match schema: ${validationError.details.map(
            (detail) => `${detail.message}`,
        )}`;
        this.status = 400;
    }
}
