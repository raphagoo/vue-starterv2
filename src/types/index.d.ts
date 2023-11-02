type User = {
    name: string;
    email: string;
    password: string;
    c_password: string;
} | null

type userState = {
    status: object;
    user: User
}
