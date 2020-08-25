import { HTTPError } from './route.errors';

export class UsernameExistsError extends HTTPError {
    message = 'Username already exists';
    status = 400;
}

export class EmailExistsError extends HTTPError {
    message = 'Email already exists';
    status = 400;
}

export class LoginFailedError extends HTTPError {
    message = 'Username/Email and/or password are incorrect.';
    status = 401;
}
