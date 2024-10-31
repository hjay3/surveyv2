import { FC } from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <div className={`h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-600 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};