import { Router } from 'express';
import * as Joi from 'joi';

import { createUser, login } from '@db/auth/auth.db';
import { validate } from '@utils/routes.utils';
import { UsernameExistsError, EmailExistsError, LoginFailedError } from '@errors/auth.errors';
import {
    EmailExistsDBError,
    LoginFailedDBError,
    UsernameExistsDBError,
} from '@db/auth/auth.db.errors';

export const auth = Router();

const signupSchema = Joi.object({
    username: Joi.string().alphanum().max(40).required(),
    email: Joi.string().email().max(40).required(),
    password: Joi.string()
        .min(8)
        /**
         * - Contains at least one number
         * - Contains at least one lowercase letter
         * - Contains at least one uppercase letter
         * - Contains at least one of the following: @#$%^&+=
         */
        .regex(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/))
        .required(),
});

auth.post('/signup', validate(signupSchema), async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await createUser(username, email, password).catch((error) => {
        if (error instanceof UsernameExistsDBError) {
            next(new UsernameExistsError());
        } else if (error instanceof EmailExistsDBError) {
            next(new EmailExistsError());
        } else {
            next(error);
        }
    });
    if (user) res.status(201).send(`New user "${user.username}" created.`);
});

const loginSchema = Joi.object({
    username: Joi.string().alphanum().max(40),
    email: Joi.string().email(),
    password: Joi.string().required(),
}).xor('username', 'email');

auth.post('/login', validate(loginSchema), async (req, res, next) => {
    const { username, email, password } = req.body;
    const success = await login(username, email, password).catch((error) => {
        if (error instanceof LoginFailedDBError) next(new LoginFailedError());
        next(error);
    });
    if (success) {
        res.status(200).json('Login successful.');
    }
});
