export enum ActionsType {
    FETCH_USERDETAILS = 'fetch user details',
    FETCH_USERrOLE = 'fetch user role',
    UPDATE_USERDETAILS = 'update user details'
}

export class FetchUserDetails {
    public static readonly type = ActionsType.FETCH_USERDETAILS;
}

export class UpdateUserRole {
    public static readonly type = ActionsType.FETCH_USERrOLE;
    constructor(readonly role: string){};
}