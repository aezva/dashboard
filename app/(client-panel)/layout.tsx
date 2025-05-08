'use client';

import { ReactNode } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function ClientPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl pt-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 