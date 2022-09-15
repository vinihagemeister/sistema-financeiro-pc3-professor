import { Role } from "./role";

export interface User {
    _id: string;
    nome: string;
    email: string;
    celular: string;
    idSocial: string;
    role: Role;
}
