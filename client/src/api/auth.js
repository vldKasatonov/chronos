// import instance from './axiosInstance'; when backend is ready

const MOCK_DELAY = 600;
const TEST_PASSWORD = '123456';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function register(data) {
    await delay(MOCK_DELAY);

    if (data.email === 'taken@test.com') {
        throw { response: { data: { message: 'Email is already taken' } } };
    }

    return {
        token: 'mock-token',
        user: { id: 1, login: data.login, email: data.email },
    };
}

export async function login(data) {
    await delay(MOCK_DELAY);

    if (data.password !== TEST_PASSWORD) {
        throw { response: { data: { message: 'Invalid credentials' } } };
    }

    return {
        token: 'mock-token',
        user: { id: 1, login: data.identifier },
    };
}