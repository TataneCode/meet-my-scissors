export interface RegisterResponseUser {
    id: string;
}

export interface RegisterResponse {
    message: string;
    user: RegisterResponseUser;
}