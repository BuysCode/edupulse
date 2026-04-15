import { signIn, authClient, useSession } from "@/lib/auth-client";
import type { SignInSchemaT, SignUpSchemaT } from "./users.schemas";

export const handleSignIn = async (data: SignInSchemaT) => {
    return await signIn.email({
        email: data.email,
        password: data.password
    });
};

export const handleSignUp = async (data: SignUpSchemaT) => {
    const session = useSession()

    if (!session) {
        throw new Error("Nenhum usuário logado")
    }

    if (session.data?.user.role !== "admin") {
        throw new Error("O usuário logado não é um administrador")
    }

    if (data.userRole === "employee") {
        return authClient.admin.createUser({
            email: data.email,
            name: data.fullName,
            password: data.password,
            data: {
                username: data.userName,
                userRole: data.userRole
            },
            role: "admin"
        })
    }

    if (data.userRole === "parent") {
        if (!data.studentId) {
            throw new Error("O responsável não está com o(s) aluno(s) inseridos")
        }

        return authClient.admin.createUser({
            email: data.email,
            name: data.fullName,
            password: data.password,
            data: {
                username: data.userName,
                userRole: data.userRole,
                studentId: data.studentId
            },
            role: "user"
        })
    }

    if (data.userRole === "student" && !data.parentId) {
        throw new Error("O usuário não está com o responsável inserido")
    }

    if (!data.serialCode) {
        return authClient.admin.createUser({
            email: data.email,
            name: data.fullName,
            password: data.password,
            data: {
                username: data.userName,
                userRole: data.userRole,
                parentId: data.parentId
            },
            role: "user"
        })
    }

    return authClient.admin.createUser({
        email: data.email,
        name: data.fullName,
        password: data.password,
        data: {
            serialCode: data.serialCode,
            username: data.userName,
            userRole: data.userRole,
            parentId: data.parentId
        },
        role: "user"
    })
}
