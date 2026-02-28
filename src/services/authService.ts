import { api } from "../utils/requester";

import {
    User,
    RegisterData,
    LoginData,
    ChangePasswordData,
} from "../interfaces/Users";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password?token=${token}`,
    profile: "/auth/profile",
    resendEmail: "/auth/resend-email",
};

async function register(data: RegisterData) {
    return api.post<{ message: string }>(endPoints.register, data, undefined);
}

async function login(data: LoginData) {
    return api.post<{ accessToken: string }>(endPoints.login, data, undefined);
}

async function logout() {
    return api.post<{ message: string }>(
        endPoints.logout,
        undefined,
        undefined,
    );
}

async function changePassword(data: ChangePasswordData) {
    return api.post<{ message: string }>(
        endPoints.changePassword,
        data,
        undefined,
    );
}

async function resetPassword(token: string, data: { newPassword: string }) {
    return api.post<{ message: string }>(
        endPoints.resetPassword(token),
        data,
        undefined,
    );
}

async function forgotPassword(data: { email: string }) {
    return api.post<{ message: string }>(
        endPoints.forgotPassword,
        data,
        undefined,
    );
}

async function profile(signal?: AbortSignal) {
    return api.get<User>(endPoints.profile, signal);
}

async function editUser(data: FormData) {
    return api.put<User>(endPoints.profile, data, undefined);
}

async function resendEmail(data: { email: string }) {
    return api.post<{ message: string }>(
        endPoints.resendEmail,
        data,
        undefined,
    );
}

export const authServices = {
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
