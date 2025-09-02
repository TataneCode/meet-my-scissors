import {UserRole} from '@/app/api/models/user';

export interface RegisterRequest {
    email: string;
    password: string;
    role: UserRole;
    name: string;
    address?: string;
}