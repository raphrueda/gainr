export class UsernameExistsDBError extends Error {
    constructor() {
        super('Username already exists');
        Object.setPrototypeOf(this, UsernameExistsDBError.prototype);
    }
}

export class EmailExistsDBError extends Error {
    constructor() {
        super('Email already exists');
        Object.setPrototypeOf(this, EmailExistsDBError.prototype);
    }
}

export class LoginFailedDBError extends Error {
    constructor() {
        super('Login failed');
        Object.setPrototypeOf(this, LoginFailedDBError.prototype);
    }
}
