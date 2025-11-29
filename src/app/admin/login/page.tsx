"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg("Identifiants incorrects.");
            return;
        }

        redirect("/admin/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md bg-card/50 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-card/20">
                <h2 className="text-3xl font-bold text-center mb-6 text-footer">
                    Connexion
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer w-full p-3 pt-6 rounded-xl bg-background border focus:border-footer outline-none transition placeholder-transparent"
                            placeholder="Email"
                        />

                        <label className="absolute left-3 top-3 text-foreground/60 text-xl transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-500 bg-background peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs">
                            Email
                        </label>
                    </div>

                    {/* Mot de passe */}
                    <div className="relative">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer w-full p-3 pt-6 rounded-xl bg-background border focus:border-footer outline-none transition placeholder-transparent"
                            placeholder="Mot de passe"
                        />

                        <label
                            className="absolute left-3 top-3 text-foreground/60 text-xl transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-500 bg-background peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs">
                            Mot de passe
                        </label>
                    </div>

                    {/* Erreur */}
                    {errorMsg && (
                        <p className="text-destructive text-center text-sm">{errorMsg}</p>
                    )}

                    {/* Bouton avec spinner */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 ${loading ? "bg-footer/70" : "bg-footer"} text-primary-foreground font-semibold hover:opacity-90 transition`}
                    >
                        {loading && (
                            <Loader2 className="animate-spin h-5 w-5" />
                        )}
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>

                </form>
            </div>
        </div>
    );
}
