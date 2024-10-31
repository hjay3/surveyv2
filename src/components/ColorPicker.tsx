import { FC } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer"
        />
        <span className="text-gray-700">{value}</span>
      </div>
    </div>
  );
};