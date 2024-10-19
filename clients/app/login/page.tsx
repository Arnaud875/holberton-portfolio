"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/dashboard"); // Redirection vers une page de tableau de bord après connexion réussie
    } else {
      const { message } = await response.json();
      setError(message || "Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Connexion</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-1">
              Nom d'utilisateur:
              <input
                type="text"
                className="border border-gray-700 rounded w-full py-2 px-3 mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-black mb-1">
              Mot de passe:
              <input
                type="password"
                className="border border-gray-700 rounded w-full py-2 px-3 mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 transition duration-300"
          >
            Se Connecter
          </button>
        </form>
        <p className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-blue-500">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
