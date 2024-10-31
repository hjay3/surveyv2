import { FC } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface WelcomePageProps {
  soundEnabled: boolean;
  onSoundChange: (enabled: boolean) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onContinue: () => void;
}

export const WelcomePage: FC<WelcomePageProps> = ({
  soundEnabled,
  onSoundChange,
  language,
  onLanguageChange,
  onContinue
}) => {
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian',
    'Portuguese', 'Russian', 'Japanese', 'Korean', 'Chinese',
    'Arabic', 'Hindi', 'Turkish', 'Dutch', 'Polish',
    'Swedish', 'Danish', 'Norwegian', 'Finnish', 'Greek'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to SurveyApp</h1>
        <p className="mt-2 text-gray-600">Let's get to know you better</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Sound Effects</span>
          <button
            onClick={() => onSoundChange(!soundEnabled)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-6 h-6 text-indigo-600" />
            ) : (
              <VolumeX className="w-6 h-6 text-gray-400" />
            )}
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Language
          </label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {languages.map((lang) => (
              <option key={lang.toLowerCase()} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};