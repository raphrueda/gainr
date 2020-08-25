import { compare, genSalt, hash } from 'bcrypt';

import { dbService } from '../db-service';
import { Tables } from '../tables';
import { EmailExistsDBError, LoginFailedDBError, UsernameExistsDBError } from './auth.db.errors';

/**
 * Create user with provided username, email and password
 * @returns Created row in Users table
 * @throws {UsernameExistsDBError} Username must be unique
 * @throws {EmailExistsDBError} Email must be unique
 */
export const createUser = async (username: string, email: string, password: string) => {
    const hashedPassword = await genSalt(10).then((salt) => hash(password, salt));
    const createUserQuery = `INSERT INTO ${Tables.Users} (username, email, pw_hash) VALUES ($1, $2, $3) RETURNING id, username, email`;
    const result = await dbService
        .query(createUserQuery, [username, email, hashedPassword])
        .catch((error) => {
            if (error.constraint === `${Tables.Users}_username_key`) {
                throw new UsernameExistsDBError();
            } else if (error.constraint === `${Tables.Users}_email_key`) {
                throw new EmailExistsDBError();
            } else {
                throw new Error(error);
            }
        });
    return result.rows[0];
};

/**
 * Checks if provided credentials match
 * @returns {true} if credentials match
 * @throws {LoginFailedDBError} password does not match saved hash
 */
export const login = async (username: string, email: string, password: string) => {
    const providedField = username !== undefined ? 'username' : 'email';
    const providedFieldValue = username ?? email;

    const loginQuery = `SELECT pw_hash FROM ${Tables.Users} WHERE ${providedField}=$1`;
    const result = await dbService.query(loginQuery, [providedFieldValue]);
    if (result.rowCount === 0) throw new LoginFailedDBError();

    const { pw_hash } = result.rows[0];
    const match = await compare(password, pw_hash);
    if (!match) throw new LoginFailedDBError();

    return true;
};
