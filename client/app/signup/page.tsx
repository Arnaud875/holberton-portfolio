"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
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
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/login"); // Redirection vers la page de connexion
    } else {
      const { message } = await response.json();
      setError(message || "Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Créer un Compte
        </h1>{" "}
        {/* Changer la couleur du titre */}
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Couleur rouge pour les erreurs */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black mb-1">
              Nom d'utilisateur:
              <input
                type="text"
                className="border border-gray-500 rounded w-full py-2 px-3 text-black mt-1"
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
                className="border border-gray-500 rounded w-full py-2 px-3 mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 transition duration-300"
          >
            Créer un Compte
          </button>
        </form>
      </div>
    </div>
  );
}
