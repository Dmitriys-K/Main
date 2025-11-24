export interface User {
    name: string;
    surname: string;
    email: string;
    password?: string;
    favorites?: string[];
}

export type UserProfile = Omit<User, 'password'>;
