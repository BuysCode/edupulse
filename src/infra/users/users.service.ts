import { UsersRepository } from "./users.repository";
import { SignUpSchemaT } from './users.schemas'

export class UsersService {
    constructor(
        private readonly repository: UsersRepository
    ) { }

    async createUser(data: SignUpSchemaT) {
        const created = await this.repository.createUser(data)

        return created;
    }
}