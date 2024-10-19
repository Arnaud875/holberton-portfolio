import { NextResponse } from "next/server";

let messages = [
  { id: 1, text: "Bienvenue dans le chat !", sender: "Admin" },
  // Ajoute d'autres messages de test si nécessaire
];

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { text, sender } = await request.json();
  const newMessage = { id: Date.now(), text, sender };
  messages.push(newMessage);
  return NextResponse.json(newMessage, { status: 201 });
}
