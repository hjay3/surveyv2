import { FC, useState } from 'react';
import { Plus } from 'lucide-react';

interface AddItemFormProps {
  onAdd: (name: string, rating: number) => void;
  placeholder: string;
  maxItems?: number;
  currentCount: number;
}

export const AddItemForm: FC<AddItemFormProps> = ({
  onAdd,
  placeholder,
  maxItems,
  currentCount
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), rating);
      setName('');
      setRating(5);
    }
  };

  if (maxItems && currentCount >= maxItems) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-2 border-2 rounded-lg focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        <label className="block text-sm text-gray-600">Rating (1-10)</label>
        <input
          type="range"
          min="1"
          max="10"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>{rating}</span>
          <span>10</span>
        </div>
      </div>
    </form>
  );
};