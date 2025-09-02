import {RegisterRequest} from '@/app/client/auth/requests';
import {RegisterResponse} from '@/app/client/auth/responses';




export async function Register(user: RegisterRequest): Promise<string> {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: user.email,
            name: user.name,
            address: user.address,
            password: user.password,
            role: user.role
        }),
    });

    const json = await res.json();

    if(!res.ok) {
     throw new Error(`Erreur API: ${res.status}`);
    }

    return (json as RegisterResponse).user.id;
}