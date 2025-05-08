export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  messages: Message[];
}

class ChatService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  async sendMessage(message: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar mensaje');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en sendMessage:', error);
      throw error;
    }
  }

  async getHistory(): Promise<ChatHistory> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/history`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener historial');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getHistory:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService(); 