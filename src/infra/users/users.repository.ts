import { SignUpSchemaT } from "./users.schemas";

export class UsersRepository {
    async createUser(data: SignUpSchemaT) {
        // Toda a lógica de criação do usuário no banco de dados
    }
}