'use client';

import { useState } from 'react';
import { 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  TicketIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export default function CustomerServicePage() {
  const [activeTab, setActiveTab] = useState('tickets');

  const tabs = [
    { id: 'tickets', name: 'Tickets', icon: TicketIcon },
    { id: 'chat', name: 'Chat', icon: ChatBubbleLeftIcon },
    { id: 'clientes', name: 'Clientes', icon: UserGroupIcon },
    { id: 'conocimiento', name: 'Base de Conocimiento', icon: DocumentTextIcon },
    { id: 'configuracion', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  const metrics = [
    { name: 'Tickets Abiertos', value: '12', change: '+2', changeType: 'increase' },
    { name: 'Tiempo de Respuesta', value: '15 min', change: '-5 min', changeType: 'decrease' },
    { name: 'Satisfacción', value: '92%', change: '+3%', changeType: 'increase' },
    { name: 'Tickets Resueltos', value: '45', change: '+8', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asistente de Atención al Cliente</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tu asistente especializado en atención y soporte al cliente
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Eliminamos el botón de chat adicional */}
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              <span className={`inline-flex items-center text-sm ${
                metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.changeType === 'increase' ? 
                  <ArrowTrendingUpIcon className="h-4 w-4" /> : 
                  <ArrowTrendingDownIcon className="h-4 w-4" />
                }
                {metric.change}
              </span>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Pestañas */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-nia-pink text-nia-pink'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon
                className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${activeTab === tab.id ? 'text-nia-pink' : 'text-gray-400 group-hover:text-gray-500'}
                `}
                aria-hidden="true"
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de las pestañas */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Tickets Recientes</h2>
              <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                Nuevo Ticket
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Problema con el pago</h3>
                    <p className="text-sm text-gray-500">ID: #12345 - Abierto hace 2 horas</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nia-pink/10 text-nia-pink">
                    Alta
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Error en la factura</h3>
                    <p className="text-sm text-gray-500">ID: #12346 - Abierto hace 1 día</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-nia-pink/10 text-nia-pink">
                    Media
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Chats Activos</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                        <span className="text-nia-pink font-medium">MR</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">María Rodríguez</h3>
                      <p className="text-sm text-gray-500">Tienda: ModaExpress.com</p>
                      <p className="text-xs text-gray-400">Última interacción: Hace 1 día</p>
                    </div>
                  </div>
                  <a 
                    href="/messages?category=atencion&user=maria-rodriguez&open=true" 
                    className="text-nia-pink hover:text-nia-pink/80"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                        <span className="text-nia-pink font-medium">JD</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Juan Díaz</h3>
                      <p className="text-sm text-gray-500">Tienda: TechGadgets.com</p>
                      <p className="text-xs text-gray-400">Última interacción: Hace 2 días</p>
                    </div>
                  </div>
                  <a 
                    href="/messages?category=atencion&user=juan-diaz&open=true" 
                    className="text-nia-pink hover:text-nia-pink/80"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Clientes</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                      <span className="text-nia-pink font-medium">MR</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">María Rodríguez</h3>
                    <p className="text-sm text-gray-500">Tienda: ModaExpress.com</p>
                    <p className="text-xs text-gray-400">Cliente desde: Enero 2024</p>
                    <p className="text-xs text-gray-400 mt-1">3 compras realizadas</p>
                  </div>
                  <a 
                    href="/messages?category=atencion&user=maria-rodriguez&open=true" 
                    className="text-nia-pink hover:text-nia-pink/80"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-nia-pink/10 flex items-center justify-center">
                      <span className="text-nia-pink font-medium">JD</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Juan Díaz</h3>
                    <p className="text-sm text-gray-500">Tienda: TechGadgets.com</p>
                    <p className="text-xs text-gray-400">Cliente desde: Diciembre 2023</p>
                    <p className="text-xs text-gray-400 mt-1">5 compras realizadas</p>
                  </div>
                  <a 
                    href="/messages?category=atencion&user=juan-diaz&open=true" 
                    className="text-nia-pink hover:text-nia-pink/80"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'conocimiento' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Base de Conocimiento</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Artículos Populares</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>¿Cómo realizar un pago?</span>
                    <span className="font-medium">245 visitas</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Problemas comunes de envío</span>
                    <span className="font-medium">189 visitas</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Nuevos Artículos</h3>
                <ul className="mt-2 space-y-2">
                  <li className="text-sm">Guía de devoluciones actualizada</li>
                  <li className="text-sm">Nuevas políticas de garantía</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Configuración del Asistente</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notificaciones</h3>
                  <p className="text-sm text-gray-500">Alertas de nuevos tickets y mensajes</p>
                </div>
                <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                  Configurar
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Plantillas de Respuesta</h3>
                  <p className="text-sm text-gray-500">Gestionar respuestas predefinidas</p>
                </div>
                <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                  Gestionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat con el Asistente */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-nia-pink text-black p-4 rounded-full shadow-lg hover:bg-nia-pink/90">
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
} 