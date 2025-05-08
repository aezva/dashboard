'use client';

import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          ...newGoal,
          status: 'pending',
        },
      ]);
      setNewGoal({ title: '', description: '', targetDate: '' });
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: Goal['status']) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, status: newStatus } : goal
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Objetivos Mensuales</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Nuevo Objetivo</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm"
              placeholder="Ej: Aumentar ventas en un 20%"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm"
              rows={3}
              placeholder="Describe tu objetivo en detalle..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fecha Objetivo</label>
            <input
              type="text"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <button
            onClick={handleAddGoal}
            className="bg-white text-nia-pink px-4 py-2 rounded-full text-sm hover:bg-nia-pink/10 border border-nia-pink"
          >
            <PlusIcon className="h-5 w-5 mr-2 inline-block" />
            Agregar Objetivo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Fecha objetivo: {new Date(goal.targetDate).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteGoal(goal.id)}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <select
                value={goal.status}
                onChange={(e) => handleStatusChange(goal.id, e.target.value as Goal['status'])}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-300 focus:ring-0 sm:text-sm"
              >
                <option value="pending">Pendiente</option>
                <option value="in-progress">En Progreso</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 