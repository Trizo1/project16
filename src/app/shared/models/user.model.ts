export interface User {
    name: string;
    surname: string;
    patronymic: string;
    phone: string;
    email: string;
    date: string;
    section: UserSection;
    id?: number;
    age?: number;
}

export enum UserSection {
    it,
    sales,
    delivery,
    juridical
}