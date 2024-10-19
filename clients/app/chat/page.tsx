"use client";

import { useEffect, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("User"); // Remplace par l'username de l'utilisateur connecté

  // Fetch messages when component loads
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  // Function to handle sending message
  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input) return;

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input, sender: username }),
    });

    if (response.ok) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: username,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Clear input after sending
    }
  };

  // Handle Enter key press for message input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage(event as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">Chat Room</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white rounded shadow-md p-4">
          <h2 className="text-lg font-bold text-black mb-2">Messages</h2>
          <div className="max-h-64 overflow-y-scroll text-black">
            {messages.map((message) => (
              <div key={message.id} className="mb-2">
                <strong>{message.sender}: </strong>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <form onSubmit={handleSendMessage} className="bg-white p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          className="border border-black rounded w-full py-2 px-3 mr-2 text-black" // Text color black
          placeholder="Tapez votre message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-700 transition duration-300"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
