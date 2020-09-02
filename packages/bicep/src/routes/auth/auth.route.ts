import { Router } from 'express';
import * as Joi from 'joi';
import { verify } from 'jsonwebtoken';

import { createUser, login } from '@db/auth/auth.db';
import {
    EmailExistsDBError,
    LoginFailedDBError,
    UsernameExistsDBError,
} from '@db/auth/auth.db.errors';
import { validate } from '@routes/route.utils';

import { UsernameExistsError, EmailExistsError, LoginFailedError } from './auth.errors';
import { generateAccessToken, generateRefreshToken } from './auth.utils';

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
        .regex(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/))
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
    try {
        const { id } = await login(username, email, password);
        if (id !== undefined) {
            res.cookie('rid', generateRefreshToken(id), { httpOnly: true });
            const token = generateAccessToken(id);
            res.status(200).json(token);
        }
    } catch (error) {
        if (error instanceof LoginFailedDBError) next(new LoginFailedError());
        return next(error);
    }
});

auth.post('/refresh_token', (req, res) => {
    const token = req.cookies.rid;
    if (!token) {
        res.status(400);
        res.send('Missing refresh token.');
    }
    try {
        // TODO Duplicated logic
        if (!process.env?.REFRESH_TOKEN_SECRET) {
            console.error('Missing refresh secret.');
            throw new Error('Something went wrong.');
        }
        const payload = verify(token, process.env.REFRESH_TOKEN_SECRET) as any;
        return res.status(200).json(generateAccessToken(payload.id));
    } catch (error) {
        console.log(error);
        return res.send(500);
    }
});
