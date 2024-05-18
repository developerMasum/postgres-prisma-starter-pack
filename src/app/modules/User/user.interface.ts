

export type IUserFilterRequest = {
    searchTerm?: string | undefined;
    email?: string | undefined;

};

export type IUser = {
    id: string;
    email: string;
    role: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
