import { DollarSign, Plane, Home, Map, Utensils } from 'lucide-react';
import type { BudgetBreakdown as BudgetBreakdownType } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';

interface BudgetBreakdownProps {
  breakdown: BudgetBreakdownType;
  totalBudget?: number;
}

const budgetItems = [
  { key: 'flight', label: 'Vuelo', icon: Plane, color: 'text-blue-500' },
  { key: 'accommodation', label: 'Alojamiento', icon: Home, color: 'text-purple-500' },
  { key: 'activities', label: 'Actividades', icon: Map, color: 'text-green-500' },
  { key: 'food_transport', label: 'Comida/Transporte', icon: Utensils, color: 'text-orange-500' },
] as const;

export function BudgetBreakdown({ breakdown, totalBudget }: BudgetBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          Desglose de Presupuesto
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {totalBudget && (
          <div className="mb-4 p-3 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-700">
              Presupuesto ingresado: <span className="font-bold">${totalBudget} USD</span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          {budgetItems.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-gray-700">{label}</span>
              </div>
              <span className="font-semibold text-gray-900">
                {breakdown[key]}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total Estimado</span>
            <span className="text-xl font-bold text-primary-600">{breakdown.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
