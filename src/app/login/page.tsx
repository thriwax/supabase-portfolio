'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import { NeumorphicButton } from '../components/UI/NeumorphicButton'
import { NeumorphicInput } from '../components/UI/NeumorphicInput'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            setError(error.message)
        } else {
            // Ставим куку на 1 день (можешь изменить)
            document.cookie = `session=true; path=/; max-age=${60 * 60 * 24}`

            router.push('/admin')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center login-form">
            <form onSubmit={handleLogin} className="bg-[#2d2d2d] p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#7e8b4a] to-[#D3E97A] font-semibold mb-4">Login</h2>
                <NeumorphicInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="mb-3"
                />

                <NeumorphicInput
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="mb-4"
                />
                <NeumorphicButton className="w-[100%]" type="submit">
                    <p className="text-center">Login</p>
                </NeumorphicButton>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    )
}
