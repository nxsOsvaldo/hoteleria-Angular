export interface UserRequest{
    username: string;
    password: string;
    roles: string[];
}

export interface UserResponse{
    username: string;
    roles: string[];
}