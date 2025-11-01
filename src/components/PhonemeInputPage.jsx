import React, { useState } from "react";
import { IPAConsonantKeyboard, IPAVowelKeyboard } from "./IPAKeyboard";

export default function PhonemeInputPage({ onNext }) {
  const [consonants, setConsonants] = useState([]);
  const [vowels, setVowels] = useState([]);

  // Add new phonemes (prevent duplicates)
  const addConsonant = (symbol) =>
    setConsonants((prev) =>
      prev.includes(symbol) ? prev : [...prev, symbol]
    );

  const addVowel = (symbol) =>
    setVowels((prev) => (prev.includes(symbol) ? prev : [...prev, symbol]));

  // Delete / Clear actions
  const deleteLastConsonant = () =>
    setConsonants((prev) => prev.slice(0, -1));
  const clearConsonants = () => setConsonants([]);

  const deleteLastVowel = () => setVowels((prev) => prev.slice(0, -1));
  const clearVowels = () => setVowels([]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-8">Step 1: Select Phonemes</h1>

      {/* Consonants */}
      <div className="w-full max-w-4xl mb-12 text-center">
        <label className="block font-semibold mb-2 text-lg">
          Consonant roster
        </label>
        <div className="min-h-[64px] p-3 bg-gray-50 rounded border border-gray-300 mb-4">
          {consonants.join(" ") || "(none)"}
        </div>

        <IPAConsonantKeyboard onSelect={addConsonant} />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={deleteLastConsonant}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-lime-100 transition-all"
          >
            ⌫ Delete Last
          </button>
          <button
            onClick={clearConsonants}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-lime-100 transition-all"
          >
            ❌ Clear All
          </button>
        </div>
      </div>

      {/* Vowels */}
      <div className="w-full max-w-4xl text-center">
        <label className="block font-semibold mb-2 text-lg">
          Vowel roster
        </label>
        <div className="min-h-[64px] p-3 bg-gray-50 rounded border border-gray-300 mb-4">
          {vowels.join(" ") || "(none)"}
        </div>

        <IPAVowelKeyboard onSelect={addVowel} />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={deleteLastVowel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-lime-100 transition-all"
          >
            ⌫ Delete Last
          </button>
          <button
            onClick={clearVowels}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-lime-100 transition-all"
          >
            ❌ Clear All
          </button>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={() => onNext(consonants, vowels)}
        disabled={consonants.length === 0 || vowels.length === 0}
        className="mt-10 px-8 py-4 bg-lime-200 border border-lime-500 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next ➜
      </button>
    </div>
  );
}
