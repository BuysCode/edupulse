import { UsersController } from "@/infra/users/users.controller";
import { UsersRepository } from "@/infra/users/users.repository";
import { UsersService } from "@/infra/users/users.service";

const repository = new UsersRepository()
const service = new UsersService(repository)
const controller = new UsersController(service)

export async function POST() {
    controller.createUser
}