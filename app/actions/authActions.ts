"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function handleGithubSignin(){
    await signIn("github", {redirectTo: "/"})
}

export async function handleCredentialsSignin({ email, password }: { email: string, password: string }) {
    try {
        console.log("sign in...")
        await signIn("credentials", { email, password, redirectTo: "/" })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: 'Invalid credentials'
                    }
                default:
                    return {
                        message: 'Something wrong.'
                    }
            }
        }
        throw error
    }
}

export async function handleSignOut() {
    await signOut()
}