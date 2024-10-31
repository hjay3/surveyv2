import { FC } from 'react';
import { Shield } from 'lucide-react';

interface AuthDisplayProps {
  authProvider: string;
  userId: string;
  name?: string;
}

export const AuthDisplay: FC<AuthDisplayProps> = ({ authProvider, userId, name }) => {
  return (
    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-indigo-600" />
        <div>
          <p className="text-sm font-medium text-indigo-900">
            Authenticated with {authProvider}
          </p>
          {name && (
            <p className="text-sm text-indigo-700">Name: {name}</p>
          )}
          <p className="text-xs text-indigo-600">ID: {userId}</p>
        </div>
      </div>
    </div>
  );
};