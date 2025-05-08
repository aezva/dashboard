'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { 
  HomeIcon, 
  ChatBubbleLeftIcon, 
  PuzzlePieceIcon, 
  UserIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  PhoneIcon,
  FlagIcon,
  MegaphoneIcon,
  LockClosedIcon,
  UserCircleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Mensajes', href: '/messages', icon: ChatBubbleLeftIcon },
  { name: 'Integraciones', href: '/integrations', icon: PuzzlePieceIcon },
  { name: 'Negocio', href: '/business', icon: BuildingStorefrontIcon },
  { name: 'Objetivos', href: '/goals', icon: FlagIcon },
  { name: 'Análisis', href: '/insights', icon: ChartBarIcon },
  { name: 'Configuración', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Facturación', href: '/billing', icon: CreditCardIcon },
  { name: 'Soporte', href: '/support', icon: QuestionMarkCircleIcon },
];

const rolesNavigation = [
  { name: 'Asistente Personal', href: '/roles/personal', icon: UserGroupIcon, comingSoon: false },
  { name: 'Asistente de Ventas', href: '/roles/sales', icon: ShoppingCartIcon, comingSoon: false },
  { name: 'Atención al Cliente', href: '/roles/customer-service', icon: PhoneIcon, comingSoon: false },
  { name: 'Asistente de Marketing', href: '/roles/marketing', icon: MegaphoneIcon, comingSoon: true },
  { name: 'Asistente de RRHH', href: '/roles/hr', icon: UserCircleIcon, comingSoon: true },
  { name: 'Asistente de Finanzas', href: '/roles/finance', icon: CurrencyDollarIcon, comingSoon: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(224); // 14rem (56 * 4px)
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing && sidebarRef.current) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 400) { // Límites mínimo y máximo
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  return (
    <div 
      ref={sidebarRef}
      className="flex h-full flex-col bg-white border-r border-gray-200 relative"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div
        className="absolute right-0 top-0 h-full w-0.5 cursor-ew-resize hover:bg-gray-300 active:bg-gray-400 transition-colors"
        onMouseDown={startResizing}
      />
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-1 pt-4 sm:pt-6">
          <li>
            <ul role="list" className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        group flex items-center gap-x-3 rounded-md px-[24px] py-1.5 text-sm leading-6 font-medium
                        ${isActive 
                          ? 'bg-nia-pink/10 text-nia-pink' 
                          : 'text-gray-700 hover:text-nia-pink hover:bg-nia-pink/10'
                        }
                      `}
                    >
                      <item.icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? 'text-nia-pink' : 'text-gray-400 group-hover:text-nia-pink'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          
          <li className="mt-8">
            <div className="px-[24px] text-xs font-semibold leading-6 text-gray-400">Roles</div>
            <ul role="list" className="mt-2 space-y-1">
              {rolesNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.comingSoon ? '#' : item.href}
                      onClick={(e) => {
                        if (item.comingSoon) {
                          e.preventDefault();
                        }
                      }}
                      className={`
                        group flex items-center gap-x-3 rounded-md px-[24px] py-1.5 text-sm leading-6 font-medium cursor-pointer
                        ${isActive 
                          ? 'bg-nia-pink/10 text-nia-pink' 
                          : item.comingSoon
                            ? 'text-gray-400'
                            : 'text-gray-700 hover:text-nia-pink hover:bg-nia-pink/10'
                        }
                      `}
                    >
                      <div className="relative flex-shrink-0">
                        <item.icon
                          className={`h-5 w-5 ${
                            isActive ? 'text-nia-pink' : item.comingSoon ? 'text-gray-300' : 'text-gray-400 group-hover:text-nia-pink'
                          }`}
                          aria-hidden="true"
                        />
                        {item.comingSoon && (
                          <LockClosedIcon
                            className="absolute -top-1 -right-1 h-3 w-3 text-nia-pink"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{item.name}</span>
                        {item.comingSoon && (
                          <span className="text-xs text-nia-pink/80">Próximamente</span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
} 