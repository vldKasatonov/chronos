const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // default to true if not set
const API_URL = import.meta.env.VITE_API_URL ?? '/api';

const USERS_KEY = 'chronos_users';
const TOKEN_KEY = 'chronos_token';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));
const normalize = (value) => String(value).trim().toLowerCase();

const apiError = (message, status = 400) =>
    Object.assign(new Error(message), { response: { status, data: { message } } });

const readUsers = () => {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
    } catch {
        return [];
    }
};

const mockApi = {
    async register({ fullName, login, email, password }) {
        await delay();
        const users = readUsers();

        if (users.some((u) => normalize(u.login) === normalize(login))) {
            throw apiError('Username is already taken', 409);
        }
        if (users.some((u) => normalize(u.email) === normalize(email))) {
            throw apiError('Email is already registered', 409);
        }

        const user = { id: String(Date.now()), fullName, login, email, password };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
        return { id: user.id, fullName, login, email };
    },

    async login({ identifier, password }) {
        await delay();
        const id = normalize(identifier);
        const user = readUsers().find(
            (u) => normalize(u.login) === id || normalize(u.email) === id
        );

        if (!user || user.password !== password) {
            throw apiError('Invalid login or password', 401);
        }

        const token = `mock-token-${user.id}`;
        localStorage.setItem(TOKEN_KEY, token);
        return { token, user: { id: user.id, fullName: user.fullName, login: user.login, email: user.email } };
    },

    async logout() {
        await delay(150);
        localStorage.removeItem(TOKEN_KEY);
    },
};


async function request(path, body) {
    const token = localStorage.getItem(TOKEN_KEY);
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(body),
        });
    } catch {
        throw apiError('Cannot reach the server. Please try again.', 0);
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw apiError(data.message || 'Request failed', response.status);
    }
    return data;
}

const realApi = {
    register: (payload) => request('/auth/register', payload),

    async login(payload) {
        const data = await request('/auth/login', payload);
        if (data.token) {
            localStorage.setItem(TOKEN_KEY, data.token);
        }
        return data;
    },

    async logout() {
        localStorage.removeItem(TOKEN_KEY);
    },
};

const api = USE_MOCK ? mockApi : realApi;

export const register = (payload) => api.register(payload);
export const login = (payload) => api.login(payload);
export const logout = () => api.logout();
export const isAuthenticated = () => Boolean(localStorage.getItem(TOKEN_KEY));