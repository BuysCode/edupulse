import { createAuthClient } from "better-auth/react"
import { auth } from './auth'

import { inferAdditionalFields, adminClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>(), adminClient()]
})

export const { deleteUser, useSession, signIn, signUp, signOut, changePassword, updateUser } = authClient

export const gitHubSignInFunc = async () => {
    const { data, error } = await signIn.social({
        provider: "github",
        callbackURL: "/dashboard"
    })

    if (error) {
        throw new Error(`Login via GitHub mal sucedido!\n\nErro: ${error}`)
    }

    return data;
}