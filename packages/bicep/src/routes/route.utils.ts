import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import { SchemaValidationError } from './route.errors';

export const validate = (schema: ObjectSchema): RequestHandler => (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
        next(new SchemaValidationError(error));
    }
    next();
};
