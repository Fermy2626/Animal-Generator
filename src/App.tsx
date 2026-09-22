import { useState, useCallback } from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';

interface Animal {
  name: string;
  emoji: string;
}

const ANIMALS: Animal[] = [
  { name: 'Lion', emoji: '🦁' },
  { name: 'Tiger', emoji: '🐯' },
  { name: 'Elephant', emoji: '🐘' },
  { name: 'Giraffe', emoji: '🦒' },
  { name: 'Zebra', emoji: '🦓' },
  { name: 'Penguin', emoji: '🐧' },
  { name: 'Dolphin', emoji: '🐬' },
  { name: 'Kangaroo', emoji: '🦘' },
  { name: 'Panda', emoji: '🐼' },
  { name: 'Gorilla', emoji: '🦍' },
  { name: 'Flamingo', emoji: '🦩' },
  { name: 'Crocodile', emoji: '🐊' },
  { name: 'Hippopotamus', emoji: '🦛' },
  { name: 'Rhinoceros', emoji: '🦏' },
  { name: 'Cheetah', emoji: '🐆' },
  { name: 'Koala', emoji: '🐨' },
  { name: 'Octopus', emoji: '🐙' },
  { name: 'Polar Bear', emoji: '🐻‍❄️' },
  { name: 'Chimpanzee', emoji: '🐵' },
  { name: 'Meerkat', emoji: '🐾' },
];

export default function App() {
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const generateAnimal = useCallback(() => {
    // Select from animals, excluding the current one to prevent repeats in a row
    const eligibleAnimals = currentAnimal
      ? ANIMALS.filter((a) => a.name !== currentAnimal.name)
      : ANIMALS;

    const randomIndex = Math.floor(Math.random() * eligibleAnimals.length);
    const selected = eligibleAnimals[randomIndex];

    setCurrentAnimal(selected);
    setIsModalOpen(true);
    setGenerationCount((prev) => prev + 1);
  }, [currentAnimal]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 flex flex-col items-center justify-center p-6 antialiased">
      {/* Main Container Card */}
      <section
        id="generator-card"
        className="w-full max-w-md bg-white border border-stone-200/80 rounded-2xl p-8 sm:p-10 shadow-sm text-center flex flex-col items-center"
      >
        {/* App Title */}
        <h1
          id="app-title"
          className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight"
        >
          Animal Generator
        </h1>

        {/* Short Description */}
        <p
          id="app-description"
          className="mt-3 text-stone-600 text-base leading-relaxed"
        >
          Click the button below to discover your random animal!
        </p>

        {/* Primary Action Button */}
        <button
          id="generate-button"
          type="button"
          onClick={generateAnimal}
          className="mt-8 w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-lg rounded-xl shadow-sm transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate an Animal</span>
        </button>

        {/* Counter */}
        <div
          id="session-counter"
          className="mt-6 pt-6 border-t border-stone-100 w-full flex items-center justify-center text-sm text-stone-500 font-medium"
        >
          <span>Animals generated this session:</span>
          <span
            id="counter-badge"
            className="ml-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700"
          >
            {generationCount}
          </span>
        </div>
      </section>

      {/* Pop-up Modal */}
      {isModalOpen && currentAnimal && (
        <div
          id="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
          className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            id="animal-modal"
            className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xl text-center relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon Button */}
            <button
              id="modal-close-icon"
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <h2
              id="modal-heading"
              className="text-lg font-medium text-stone-500"
            >
              Your Animal Is...
            </h2>

            {/* Animal Emoji */}
            <div
              id="animal-emoji"
              className="mt-4 text-7xl select-none"
              aria-hidden="true"
            >
              {currentAnimal.emoji}
            </div>

            {/* Animal Name */}
            <div
              id="animal-name"
              className="mt-3 text-3xl font-bold text-stone-900 tracking-tight"
            >
              {currentAnimal.name}
            </div>

            {/* Modal Action Buttons */}
            <div className="mt-8 flex flex-col gap-2.5 w-full">
              <button
                id="modal-try-again-button"
                type="button"
                onClick={generateAnimal}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <button
                id="modal-dismiss-button"
                type="button"
                onClick={closeModal}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-700 font-medium rounded-xl transition-colors duration-150 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

