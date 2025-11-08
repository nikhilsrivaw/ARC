export declare class AuthService {
    static register(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        workspaceName: string;
    }): Promise<{
        success: boolean;
        data: {
            token: string;
            refreshToken: string;
            user: {
                id: any;
                email: string;
                firstName: string;
                lastName: string;
            };
        };
    }>;
    static login(data: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        data: {
            token: string;
            refreshToken: string;
            user: {
                id: any;
                email: string;
            };
        };
    }>;
    static refreshToken(refreshToken: string): Promise<{
        success: boolean;
        data: {
            token: string;
        };
    }>;
}
//# sourceMappingURL=authService.d.ts.map