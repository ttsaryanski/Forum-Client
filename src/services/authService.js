import { api } from "../utils/requester";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token) => `/auth/reset-password?token=${token}`,
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

async function changePassword(data) {
    return await api.post(endPoints.changePassword, data);
}

async function resetPassword(token, data) {
    return await api.post(endPoints.resetPassword(token), data);
}

async function forgotPassword(data) {
    return await api.post(endPoints.forgotPassword, data);
}

async function profile(signal) {
    const user = await api.get(endPoints.profile, signal);

    return user;
}

async function editUser(data) {
    const editedUser = await api.put(endPoints.profile, data);

    return editedUser;
}

async function resendEmail(email) {
    return await api.post(endPoints.resendEmail(email));
}

export const authService = {
    register,
    login,
    logout,
    changePassword,
    resetPassword,
    forgotPassword,
    profile,
    editUser,
    resendEmail,
};
