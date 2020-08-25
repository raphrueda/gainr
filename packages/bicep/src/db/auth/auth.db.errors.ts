export class UsernameExistsDBError extends Error {
    message = 'Username already exists';
}

export class EmailExistsDBError extends Error {
    message = 'Email already exists';
}

export class LoginFailedDBError extends Error {
    message = 'Login failed';
}
