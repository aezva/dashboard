'use client';

import { useState } from 'react';
import { 
  CalendarIcon, 
  ClipboardDocumentListIcon, 
  ClockIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function PersonalAssistantPage() {
  const [activeTab, setActiveTab] = useState('agenda');

  const tabs = [
    { id: 'agenda', name: 'Agenda', icon: CalendarIcon },
    { id: 'tareas', name: 'Tareas', icon: ClipboardDocumentListIcon },
    { id: 'recordatorios', name: 'Recordatorios', icon: ClockIcon },
    { id: 'contactos', name: 'Contactos', icon: UserGroupIcon },
    { id: 'notas', name: 'Notas', icon: DocumentTextIcon },
    { id: 'configuracion', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asistente Personal</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tu asistente especializado en gestión personal y productividad
          </p>
        </div>
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
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Tu Asistente Personal</h2>
            <p className="mt-1 text-sm text-gray-500">
              Tu asistente personal te ayuda a organizar tu trabajo y gestionar tus tareas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agenda */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Agenda</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div>
                  <p className="text-sm font-medium">Reunión con equipo de marketing</p>
                  <p className="text-xs text-gray-500">Mañana, 10:00 AM</p>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div>
                  <p className="text-sm font-medium">Revisión de métricas</p>
                  <p className="text-xs text-gray-500">Mañana, 3:00 PM</p>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button className="mt-3 w-full bg-white text-nia-pink px-4 py-2 rounded-full text-sm hover:bg-nia-pink/10 border border-nia-pink">
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              Agregar evento
            </button>
          </div>

          {/* Tareas */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tareas Pendientes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-nia-pink border-gray-300 rounded" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Preparar presentación de ventas</p>
                    <p className="text-xs text-gray-500">Vence hoy</p>
                  </div>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-nia-pink border-gray-300 rounded" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Revisar reporte de métricas</p>
                    <p className="text-xs text-gray-500">Vence mañana</p>
                  </div>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button className="mt-3 w-full bg-white text-nia-pink px-4 py-2 rounded-full text-sm hover:bg-nia-pink/10 border border-nia-pink">
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              Agregar tarea
            </button>
          </div>

          {/* Recordatorios */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recordatorios</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div>
                  <p className="text-sm font-medium">Llamar a Juan para seguimiento</p>
                  <p className="text-xs text-gray-500">Hoy, 4:00 PM</p>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div>
                  <p className="text-sm font-medium">Enviar informe mensual</p>
                  <p className="text-xs text-gray-500">Mañana, 9:00 AM</p>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button className="mt-3 w-full bg-white text-nia-pink px-4 py-2 rounded-full text-sm hover:bg-nia-pink/10 border border-nia-pink">
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              Agregar recordatorio
            </button>
          </div>

          {/* Contactos */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Contactos Importantes</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-nia-pink/10 flex items-center justify-center">
                    <span className="text-nia-pink font-medium">JD</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Juan Díaz</p>
                    <p className="text-xs text-gray-500">Gerente de Ventas</p>
                  </div>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-nia-pink/10 flex items-center justify-center">
                    <span className="text-nia-pink font-medium">MR</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">María Rodríguez</p>
                    <p className="text-xs text-gray-500">Directora de Marketing</p>
                  </div>
                </div>
                <button className="text-nia-pink hover:text-nia-pink/80">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <button className="mt-3 w-full bg-white text-nia-pink px-4 py-2 rounded-full text-sm hover:bg-nia-pink/10 border border-nia-pink">
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              Agregar contacto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 