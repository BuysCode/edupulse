"use server";

import { compareSync } from 'bcrypt';
import prisma from "@/lib/database/config";
import { auth } from '@/lib/auth'
import { headers } from 'next/headers';

export const existingUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
}

export const handleValidateSerialCode = async (id: string, serial: string) => {
    const user = await existingUser(id)

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!user) {
        throw new Error("O usuário não existe");
    }

    if (session?.user.role === "admin") {
        throw new Error("O usuário logado é um administrador, funcionalidade exclusiva de usuários comuns")
    }

    if (!user.serialCode) {
        throw new Error("O usuário não adquiriu uma licença do produto, serial inválido")
    }

    if (!compareSync(serial, user.serialCode)) {
        throw new Error(`O código de serial ${serial} não pertence ao usuário ${user.name}`);
    }

    if (user.serialCodeValidated) {
        throw new Error(`O usuário ${user.name} já validou o código de serial`);
    }

    await prisma.user.update({
        where: { id },
        data: {
            serialCodeValidated: true
        }
    })
};
