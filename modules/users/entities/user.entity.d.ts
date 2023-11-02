export declare enum UserRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
}
export declare class User {
    id: number;
    userName: string;
    email: string;
    password: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    IsDelete: boolean;
    role: UserRole;
}
