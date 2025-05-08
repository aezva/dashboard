'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  TicketIcon,
  ArrowRightIcon,
  XMarkIcon,
  PlusIcon,
  PaperAirplaneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  category: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  conversation: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    const conversation = searchParams.get('conversation');
    const open = searchParams.get('open');

    if (category) {
      setActiveCategory(category);
    }

    if (open === 'true' && conversation) {
      const messageToOpen = messages.find(msg => msg.id === conversation);
      if (messageToOpen) {
        setSelectedMessage(messageToOpen);
      }
    }
  }, [searchParams]);

  const categories: Category[] = [
    { id: 'todos', name: 'Todas las Conversaciones', icon: ChatBubbleLeftIcon },
    { id: 'personal', name: 'NNIA Personal', icon: UserGroupIcon },
    { id: 'ventas', name: 'NNIA Ventas', icon: ShoppingCartIcon },
    { id: 'atencion', name: 'NNIA Atención al Cliente', icon: TicketIcon },
    { id: 'marketing', name: 'NNIA Marketing', icon: SparklesIcon }
  ];

  const messages: Message[] = [
    {
      id: 'personal-001',
      category: 'personal',
      title: 'Planificación de Agenda',
      lastMessage: 'NNIA ha organizado tu agenda para la próxima semana',
      timestamp: 'Hace 2 horas',
      unread: true,
      conversation: [
        { role: 'user', content: '¿Podrías ayudarme a organizar mi agenda para la próxima semana?', timestamp: '10:30' },
        { role: 'assistant', content: 'He analizado tus compromisos y he optimizado tu agenda. ¿Quieres que te muestre los cambios?', timestamp: '10:31' },
        { role: 'user', content: 'Sí, por favor', timestamp: '10:32' },
        { role: 'assistant', content: 'He reorganizado tus reuniones para maximizar tu productividad. ¿Necesitas algún ajuste específico?', timestamp: '10:33' }
      ]
    },
    {
      id: 'ventas-001',
      category: 'ventas',
      title: 'Análisis de Ventas',
      lastMessage: 'NNIA ha completado el análisis de tendencias de ventas',
      timestamp: 'Hace 1 día',
      unread: false,
      conversation: [
        { role: 'user', content: 'Analiza las tendencias de ventas del último mes', timestamp: '09:15' },
        { role: 'assistant', content: 'He identificado un aumento del 25% en las ventas de productos premium. ¿Quieres que profundice en algún aspecto específico?', timestamp: '09:16' },
        { role: 'user', content: '¿Cuál es el producto más vendido?', timestamp: '09:17' },
        { role: 'assistant', content: 'El iPhone 15 Pro ha sido el más vendido, con un 35% del total de ventas.', timestamp: '09:18' }
      ]
    },
    {
      id: 'marketing-001',
      category: 'marketing',
      title: 'Estrategia de Marketing',
      lastMessage: 'NNIA ha generado una nueva estrategia de marketing',
      timestamp: 'Hace 2 días',
      unread: false,
      conversation: [
        { role: 'user', content: 'Crea una estrategia de marketing para el próximo trimestre', timestamp: '14:30' },
        { role: 'assistant', content: 'He desarrollado una estrategia basada en tus datos históricos y tendencias del mercado. ¿Quieres que te la presente?', timestamp: '14:31' },
        { role: 'user', content: 'Sí, por favor', timestamp: '14:32' },
        { role: 'assistant', content: 'La estrategia se centra en el marketing de contenidos y las redes sociales. ¿Te gustaría ver los detalles específicos?', timestamp: '14:33' }
      ]
    }
  ];

  const filteredMessages = activeCategory === 'todos' 
    ? messages 
    : messages.filter(msg => msg.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Conversaciones con NNIA</h1>
          <p className="mt-1 text-sm text-gray-500">
            Historial de interacciones con tu asistente de IA
          </p>
        </div>
      </div>

      {/* Categorías */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`
              flex items-center p-4 rounded-lg border transition-colors
              ${
                activeCategory === category.id
                  ? 'bg-nia-pink/10 border-nia-pink text-nia-pink'
                  : 'bg-white border-gray-200 hover:border-nia-pink/50'
              }
            `}
          >
            <category.icon className="h-6 w-6 mr-3" />
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Mensajes */}
        <div className={`bg-white shadow rounded-lg border border-gray-200 ${selectedMessage ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedMessage?.id === message.id ? 'bg-gray-50' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5 text-nia-pink" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{message.title}</h3>
                      <p className="text-sm text-gray-500">{message.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                    {message.unread && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nia-pink text-white">
                        Nuevo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detalles del Mensaje */}
        {selectedMessage && (
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                      <SparklesIcon className="h-5 w-5 text-nia-pink" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{selectedMessage.title}</h3>
                      <p className="text-sm text-gray-500">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-4">
                {selectedMessage.conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-nia-pink text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 