import { api } from "../utils/requester";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
    resendEmail: (email) => `/auth/resend-email?email=${email}`,
};

async function register(data) {
    return await api.post(endPoints.register, data);
}

async function login(data) {
    return await api.post(endPoints.login, data);
}

async function logout() {
    return await api.post(endPoints.logout);
}

async function profile(signal) {
    const user = await api.get(endPoints.profile, signal);

    return user;
}

async function resendEmail(email) {
    return await api.post(endPoints.resendEmail(email));
}

export const authService = {
    register,
    login,
    logout,
    profile,
    resendEmail,
};
