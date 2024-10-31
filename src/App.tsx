import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { ProgressBar } from './components/ProgressBar';
import { AuthDisplay } from './components/AuthDisplay';
import { AddItemForm } from './components/AddItemForm';
import { ThemeDisplay } from './components/ThemeDisplay';
import { Confetti } from './components/Confetti';
import { themes } from './utils/themes';
import { generateUserId } from './utils/helpers';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [language, setLanguage] = useState('english');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [authProvider, setAuthProvider] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('#000000');
  const [favoritePerson, setFavoritePerson] = useState({ name: '', rating: 5 });
  const [musicPreference, setMusicPreference] = useState({ likes: false });
  const [favoriteArtists, setFavoriteArtists] = useState<Array<{ name: string; rating: number }>>([]);
  const [hobbies, setHobbies] = useState<Array<{ name: string; rating: number }>>([]);
  const [dislikes, setDislikes] = useState<Array<{ name: string; rating: number }>>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const currentTheme = themes[Object.keys(themes)[currentPage % Object.keys(themes).length] as keyof typeof themes];

  const totalPages = 8;
  const progress = (currentPage / totalPages) * 100;

  const handleAuth = (provider: string) => {
    setAuthProvider(provider);
    setUserId(generateUserId());
    setCurrentPage(4);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <WelcomePage
            soundEnabled={soundEnabled}
            onSoundChange={setSoundEnabled}
            language={language}
            onLanguageChange={setLanguage}
            onContinue={() => setCurrentPage(2)}
          />
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Terms and Conditions</h2>
            <div className="h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg">
              <p>Terms and conditions content...</p>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>I accept the terms and conditions</span>
            </label>
            <button
              onClick={() => setCurrentPage(3)}
              disabled={!termsAccepted}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              Continue
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <div className="grid gap-4">
              <button
                onClick={() => handleAuth('Google')}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => handleAuth('Apple')}
                className="p-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Sign in with Apple
              </button>
              <button
                onClick={() => handleAuth('Facebook')}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign in with Facebook
              </button>
              <button
                onClick={() => handleAuth('Twitter')}
                className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                Sign in with Twitter
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <AuthDisplay
              authProvider={authProvider}
              userId={userId}
            />
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                What is your name?
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
              <button
                onClick={() => setCurrentPage(5)}
                disabled={!userName.trim()}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <AuthDisplay
              authProvider={authProvider}
              userId={userId}
              name={userName}
            />
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  What's your favorite color?
                </label>
                <input
                  type="color"
                  value={favoriteColor}
                  onChange={(e) => setFavoriteColor(e.target.value)}
                  className="w-full h-12 rounded cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Who's your favorite person?
                </label>
                <input
                  type="text"
                  value={favoritePerson.name}
                  onChange={(e) => setFavoritePerson({ ...favoritePerson, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter person's name"
                />
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">How much do you like them? (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={favoritePerson.rating}
                    onChange={(e) => setFavoritePerson({ ...favoritePerson, rating: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>{favoritePerson.rating}</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage(6)}
                disabled={!favoritePerson.name.trim()}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <AuthDisplay
              authProvider={authProvider}
              userId={userId}
              name={userName}
            />
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you like music?
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setMusicPreference({ likes: true })}
                    className={`flex-1 p-3 rounded-lg border-2 ${
                      musicPreference.likes ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setMusicPreference({ likes: false });
                      setCurrentPage(7);
                    }}
                    className={`flex-1 p-3 rounded-lg border-2 ${
                      musicPreference.likes === false ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {musicPreference.likes && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Who are your favorite artists?
                  </label>
                  {favoriteArtists.map((artist, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{artist.name}</p>
                      <p className="text-sm text-gray-600">Rating: {artist.rating}/10</p>
                    </div>
                  ))}
                  <AddItemForm
                    onAdd={(name, rating) => setFavoriteArtists([...favoriteArtists, { name, rating }])}
                    placeholder="Enter artist name"
                    maxItems={3}
                    currentCount={favoriteArtists.length}
                  />
                  <button
                    onClick={() => setCurrentPage(7)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <AuthDisplay
              authProvider={authProvider}
              userId={userId}
              name={userName}
            />
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  What do you enjoy doing in your free time?
                </label>
                {hobbies.map((hobby, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{hobby.name}</p>
                    <p className="text-sm text-gray-600">Rating: {hobby.rating}/10</p>
                  </div>
                ))}
                <AddItemForm
                  onAdd={(name, rating) => setHobbies([...hobbies, { name, rating }])}
                  placeholder="Enter hobby"
                  currentCount={hobbies.length}
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  What are some things you don't like?
                </label>
                {dislikes.map((dislike, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{dislike.name}</p>
                    <p className="text-sm text-gray-600">Rating: {dislike.rating}/10</p>
                  </div>
                ))}
                <AddItemForm
                  onAdd={(name, rating) => setDislikes([...dislikes, { name, rating }])}
                  placeholder="Enter dislike"
                  currentCount={dislikes.length}
                />
              </div>

              <button
                onClick={() => {
                  setShowConfetti(true);
                  setCurrentPage(8);
                }}
                disabled={hobbies.length === 0 || dislikes.length === 0}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                Complete Survey
              </button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="text-center space-y-6">
            {showConfetti && <Confetti />}
            <h2 className="text-3xl font-bold">Thank You!</h2>
            <p className="text-gray-600">Here's your first self map:</p>
            <div className="p-6 bg-gray-50 rounded-lg">
              <pre className="text-left whitespace-pre-wrap">
                {JSON.stringify(
                  {
                    name: userName,
                    favoriteColor,
                    favoritePerson,
                    musicPreference,
                    favoriteArtists,
                    hobbies,
                    dislikes,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <ProgressBar progress={progress} className="mb-6" />
            <ThemeDisplay name={currentTheme.name} colors={currentTheme.colors} />
            <div className="mt-6">{renderPage()}</div>
            <ProgressBar progress={progress} className="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;