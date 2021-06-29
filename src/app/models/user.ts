import { Role } from '../models/role';

export class User {
    email: string;
    password: string;
    role: Role;
    token?: string;
}