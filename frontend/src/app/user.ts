export interface User {
        _id?: string;
        username: string;
        password: string;
        email?: string;
        phone?: string;
        trustsdegree?: number;
        image?: string;
        created_at?: Date;

}
