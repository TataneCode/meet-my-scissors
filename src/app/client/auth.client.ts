export interface RegisterData {
    email: string;
    password: string;
    role: string;
}

export interface RegisterResponseUser {
    id: string;
    email: string;
    role: string;
}

export interface RegisterResponse {
    message: string;
    user: RegisterResponseUser;
}

export async function Register(user: RegisterData): Promise<RegisterResponse> {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            role: user.role
        }),
    });

    const json = await res.json();

    if(!res.ok) {
     throw new Error(`Erreur API: ${res.status}`);
    }

    return json as RegisterResponse;
}