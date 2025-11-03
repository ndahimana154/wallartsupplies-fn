export interface LoginData {
    email: String;
    passsword: String;
}

export interface ForgotPasswordData {
    email: String
}

export interface VerifyForgotPasswordTokenData {
    userId: Number
    token: String

}

export interface ResetPasswordData {
    userId: Number
    token: String
    password: String
}