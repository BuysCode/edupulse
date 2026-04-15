import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./database/config";

import { z } from 'zod'

import ms from 'ms'

import { admin, openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    secret: process.env["BETTER_AUTH_SECRET"]!,
    baseURL: process.env["BETTER_AUTH_URL"] || "http://localhost:3000",


    advanced: {
        useSecureCookies: true,
    },

    session: {
        cookieCache: {
            enabled: true,
            maxAge: ms("30d"),
            strategy: "jwt"
        }
    },

    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        maxPasswordLength: 30,
        minPasswordLength: 8,
        requireEmailVerification: true
    },

    socialProviders: {
        github: {
            clientId: process.env["GITHUB_CLIENT_ID"] as string,
            clientSecret: process.env["GITHUB_CLIENT_SECRET"] as string,
        },
    },

    plugins: [
        openAPI(),
        admin()
    ],

    user: {
        additionalFields: {
            serialCode: {
                type: "string",
                unique: true,
                required: false
            },
            serialCodeValidated: {
                type: "boolean",
                defaultValue: false,
            },
            username: {
                type: "string",
                required: true,
                unique: true
            },
            parentId: {
                type: "string",
                required: false
            },
            studentId: {
                type: "string[]",
                required: false
            },
            userRole: {
                required: false,
                type: "string",
                defaultValue: "student",
                validator: {
                    input: z.enum(["student", "parent", "employee", "admin"])
                }
            }
        }
    }
});

export const { getSession, deleteUser, changePassword } = auth.api