import { Calendar } from 'lucide-react';
import type { DayItinerary } from '../../types';
import { formatDate } from '../../utils/formatters';
import { ActivityCard } from './ActivityCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';

interface DayCardProps {
  day: DayItinerary;
}

export function DayCard({ day }: DayCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-sm">{day.day}</span>
          </div>
          <div>
            <span className="text-lg">Día {day.day}</span>
            <span className="text-gray-500 text-sm ml-2 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(day.date)}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {day.activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
