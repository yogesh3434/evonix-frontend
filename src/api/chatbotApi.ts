import { apiClient } from '../lib/apiClient';

interface ChatbotResponse {
  success: boolean;
  data: {
    reply: string;
  };
}

export async function sendChatMessage(
  message: string
): Promise<string> {
  const response = await apiClient.post<ChatbotResponse>(
    '/chatbot',
    {
      message,
    }
  );

  return response.data.data.reply;
}