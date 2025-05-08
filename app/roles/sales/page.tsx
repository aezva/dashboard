'use client';

import { useState } from 'react';
import { 
  ShoppingCartIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

export default function SalesAssistantPage() {
  const [activeTab, setActiveTab] = useState('clientes');

  const tabs = [
    { id: 'clientes', name: 'Clientes', icon: UserGroupIcon },
    { id: 'pedidos', name: 'Pedidos', icon: ShoppingCartIcon },
    { id: 'analisis', name: 'Análisis', icon: ChartBarIcon },
    { id: 'presupuestos', name: 'Presupuestos', icon: CurrencyDollarIcon },
    { id: 'informes', name: 'Informes', icon: DocumentTextIcon },
    { id: 'configuracion', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  const salesMetrics = [
    { name: 'Ventas Totales', value: '€12,450', change: '+15%', changeType: 'increase' },
    { name: 'Clientes Nuevos', value: '24', change: '+8%', changeType: 'increase' },
    { name: 'Tasa de Conversión', value: '3.2%', change: '-0.5%', changeType: 'decrease' },
    { name: 'Ticket Promedio', value: '€518', change: '+12%', changeType: 'increase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Asistente de Ventas</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tu asistente especializado en ventas y prospección
          </p>
        </div>
      </div>

      {/* Métricas de ventas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {salesMetrics.map((metric) => (
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
        {activeTab === 'clientes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Clientes</h2>
              <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                Nuevo Cliente
              </button>
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
                    <p className="text-sm text-gray-500">Última compra: Hace 2 días</p>
                  </div>
                  <a 
                    href="/messages?category=ventas&user=maria-rodriguez&open=true" 
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
                    <p className="text-sm text-gray-500">Compra realizada sin asistencia</p>
                    <p className="text-xs text-gray-400 mt-1">Plan Premium - Hace 1 hora</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Compra sin ayuda de NNIA
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Pedidos Recientes</h2>
              <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                Nuevo Pedido
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Pedido #12345</h3>
                    <p className="text-sm text-gray-500">Cliente: María Rodríguez</p>
                    <p className="text-sm text-gray-500">Total: €245.00</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completado
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analisis' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Análisis de Ventas</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Productos más vendidos</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>Producto A</span>
                    <span className="font-medium">45 unidades</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Producto B</span>
                    <span className="font-medium">32 unidades</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Tendencias de venta</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Las ventas han aumentado un 15% este mes en comparación con el mes anterior.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'presupuestos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Presupuestos</h2>
              <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                Nuevo Presupuesto
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Presupuesto #789</h3>
                    <p className="text-sm text-gray-500">Cliente: Empresa XYZ</p>
                    <p className="text-sm text-gray-500">Total: €1,245.00</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pendiente
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'informes' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Informes</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Informe Mensual</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Resumen de ventas y métricas del mes actual
                </p>
                <button className="mt-4 text-nia-pink hover:text-nia-pink/80 text-sm">
                  Generar Informe
                </button>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Análisis de Clientes</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Comportamiento y preferencias de los clientes
                </p>
                <button className="mt-4 text-nia-pink hover:text-nia-pink/80 text-sm">
                  Generar Análisis
                </button>
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
                  <h3 className="text-sm font-medium text-gray-900">Notificaciones de Ventas</h3>
                  <p className="text-sm text-gray-500">Alertas de nuevos pedidos y clientes</p>
                </div>
                <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                  Configurar
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Integración con CRM</h3>
                  <p className="text-sm text-gray-500">Conectar con tu sistema CRM</p>
                </div>
                <button className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90">
                  Conectar
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