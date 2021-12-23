import { Sex } from "./sex";

export interface User {
    id: number;
    name: string;
    surname: string;
    age: number;
    sex: Sex;
    email: string;
    password: string;
}