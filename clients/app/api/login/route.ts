import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Remplace ceci par ta logique de vérification d'identifiants (base de données, etc.)
  if (username === "test" && password === "password") {
    return NextResponse.json(
      { message: "Connexion réussie!" },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { message: "Nom d'utilisateur ou mot de passe incorrect." },
      { status: 401 },
    );
  }
}
