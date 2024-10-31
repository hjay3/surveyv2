import { FC } from 'react';

interface ThemeDisplayProps {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ThemeDisplay: FC<ThemeDisplayProps> = ({ name, colors }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-2">Current Theme: {name}</p>
      <div className="flex gap-2">
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: value }}
            />
            <span className="text-xs text-gray-600">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};