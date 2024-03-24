interface LoginUserState {
    id: number;
    email: string;
    realName: string;
    shopName: string;
    loginType?: 'BASIC';
    loginToken?: LoginTokenState;
}

interface LoginTokenState {
    accessToken: string;
    refreshToken: string;
}
