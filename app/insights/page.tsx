'use client';

import { useState } from 'react';
import { 
  ChatBubbleLeftIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BoltIcon,
  GlobeAltIcon,
  ShareIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EnvelopeIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import TokenBreakdown from '../../components/TokenBreakdown';
import TimeRangeSelect from '@/components/TimeRangeSelect';
import Link from 'next/link';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface CapturedEmail {
  id: string;
  name: string;
  email: string;
  date: string;
  source: string;
  chatId: string;
}

const mockEmails: CapturedEmail[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    date: '2024-04-20',
    source: 'Web',
    chatId: '1'
  }
];

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats: StatCard[] = [
    {
      title: 'Mensajes Totales',
      value: '1,234',
      change: '+12.5%',
      icon: ChatBubbleLeftIcon,
      color: 'text-nia-pink'
    },
    {
      title: 'Leads Captados',
      value: '89',
      change: '+8.2%',
      icon: UserGroupIcon,
      color: 'text-green-500'
    },
    {
      title: 'Ventas Generadas',
      value: '45',
      change: '+15.3%',
      icon: CurrencyDollarIcon,
      color: 'text-blue-500'
    },
    {
      title: 'Tokens Consumidos',
      value: '12,345',
      change: '+5.7%',
      icon: BoltIcon,
      color: 'text-purple-500'
    }
  ];

  const messageDistribution = [
    { channel: 'Web', count: 650, percentage: 52.7 },
    { channel: 'Instagram', count: 320, percentage: 25.9 },
    { channel: 'Facebook', count: 180, percentage: 14.6 },
    { channel: 'TikTok', count: 84, percentage: 6.8 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Análisis</h1>
        <TimeRangeSelect value={timeRange} onChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                <p className="mt-1 text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.color.replace('text-', 'bg-')} bg-opacity-10`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Distribución de Mensajes</h2>
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
              <ShareIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="space-y-4">
            {messageDistribution.map((item) => (
              <div key={item.channel}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.channel}</span>
                  <span className="text-gray-900">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-nia-pink rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Consumo de Tokens</h2>
            <div className="flex items-center space-x-2">
              <BoltIcon className="h-5 w-5 text-gray-400" />
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <TokenBreakdown
            webTokens={6500}
            socialTokens={4500}
            panelTokens={1345}
            totalTokens={12345}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Tendencia de Conversiones</h2>
            <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de tendencia de conversiones</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Eficiencia de Tokens</h2>
            <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Gráfico de eficiencia de tokens por conversión</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Emails Capturados</h2>
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">{mockEmails.length} emails</span>
            </div>
          </div>
          <div className="space-y-4">
            {mockEmails.map((email) => (
              <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-nia-pink/10 rounded-full">
                    <UserIcon className="h-5 w-5 text-nia-pink" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{email.name}</p>
                    <p className="text-sm text-gray-500">{email.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 inline-block mr-1" />
                    {new Date(email.date).toLocaleDateString()}
                  </div>
                  <Link
                    href={`/messages#${email.chatId}`}
                    className="text-sm text-nia-pink hover:text-nia-pink/80"
                  >
                    Ver chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Análisis de Rendimiento</h2>
            <p className="text-gray-600">
              Monitorea el rendimiento de NNIA en tiempo real. Ella te mostrará métricas clave como conversiones, leads y consumo de tokens.
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Análisis de Conversaciones</h2>
            <p className="text-gray-600">
              Revisa todas las conversaciones de NNIA con tus visitantes. Ella analiza cada interacción para darte insights valiosos.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Personalización</h2>
            <p className="text-gray-600">
              Personaliza cómo NNIA interactúa con tus visitantes. Ella se adaptará a tu estilo y necesidades específicas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 