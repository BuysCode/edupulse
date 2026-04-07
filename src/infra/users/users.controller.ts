import type { NextApiResponse, NextApiRequest } from "next";
import { UsersService } from "./users.service";
import { signupSchema, SignUpSchemaT } from "./users.schemas";

import http from 'http-status-codes'

export class UsersController {
    constructor(
        private readonly service: UsersService
    ) { }

    createUser = async (request: NextApiRequest, response: NextApiResponse) => {
        const body = signupSchema.parse(request.body)

        const result = this.service.createUser(body)

        result.then(() => {
            const safeUser = {
                fullName: body.fullName,
                userName: body.userName,
                email: body.email
            };

            response.status(http.CREATED).json({
                message: "Usuário criado com sucesso!",
                user: safeUser
            })
        }).catch(err => {
            console.error(err)
            response.status(http.INTERNAL_SERVER_ERROR).json({ message: "Erro interno ao criar usuário" })
        })
    }
}