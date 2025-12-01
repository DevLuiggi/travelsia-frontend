import type { Activity } from '../../types';
import { getTimeIcon, formatTimeOfDay } from '../../utils/formatters';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 text-2xl">
        {getTimeIcon(activity.time)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium text-primary-600 uppercase">
              {formatTimeOfDay(activity.time)}
            </span>
            <h4 className="font-semibold text-gray-900 mt-0.5">
              {activity.activity}
            </h4>
          </div>
          <span className="text-sm font-medium text-green-600 whitespace-nowrap">
            {activity.cost}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
