export interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl?: string;
    lastLogin: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Author {
    username: string;
    avatar_url?: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
}
