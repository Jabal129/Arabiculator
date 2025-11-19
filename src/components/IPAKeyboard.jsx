import React, { useState } from "react";
import { CONSONANTS, VOWELS } from "../components/MappingLogic";

const IPA_KEYS_CONSONANTS = [...Object.keys(CONSONANTS)];
const IPA_KEYS_VOWELS = [...Object.keys(VOWELS)];

// consistent modern button style
const buttonStyle =
  "bg-white text-black font-medium rounded-xl shadow-sm hover:bg-lime-100 " +
  "active:scale-95 transition-all flex items-center justify-center " +
  "h-10 w-10 sm:h-12 sm:w-12 text-base";

const containerStyle =
  "grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-3 p-4 " +
  "bg-gray-100 rounded-3xl max-w-4xl mx-auto justify-items-center";

// ---------------- Consonant Keyboard ----------------
export function IPAConsonantKeyboard({ onSelect }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-xl font-bold mb-4 text-black">Consonants</h2>
      <div className={containerStyle}>
        {IPA_KEYS_CONSONANTS.map((k) => (
          <button key={k} onClick={() => onSelect(k)} className={buttonStyle}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ModifierKeyboard({ onAddModifier, onConfirm, onCancel, current }) {
  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-lg font-semibold mb-2 text-black">
        Add articulation modifiers
      </h3>

      <div className="flex gap-3 flex-wrap justify-center mb-4">
        {MODIFIERS.map((m) => (
          <button
            key={m}
            onClick={() => onAddModifier(m)}
            className="px-4 py-2 bg-white text-black rounded-xl border shadow hover:bg-lime-100"
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white border rounded-xl hover:bg-lime-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-lime-200 border border-lime-500 rounded-xl hover:bg-lime-300"
        >
          Confirm: {current}
        </button>
      </div>
    </div>
  );
}


// ---------------- Vowel Keyboard ----------------
export function IPAVowelKeyboard({ onSelect }) {
  const [isDiphthongMode, setIsDiphthongMode] = useState(false);
  const [firstVowel, setFirstVowel] = useState(null);

  const handleVowelClick = (symbol) => {
    if (!isDiphthongMode) {
      // Normal vowel insertion
      onSelect(symbol);
      return;
    }

    // Diphthong mode logic
    if (firstVowel === null) {
      // first vowel
      setFirstVowel(symbol);
    } else {
      // second vowel → complete diphthong
      const diphthong = firstVowel + symbol;
      onSelect(diphthong);
      setFirstVowel(null);
      setIsDiphthongMode(false); // deactivate diphthong mode
    }
  };

  const toggleDiphthongMode = () => {
    if (isDiphthongMode) {
      setIsDiphthongMode(false);
      setFirstVowel(null);
    } else {
      setIsDiphthongMode(true);
      setFirstVowel(null);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold mb-4 text-black">Vowels</h2>

      {/* Diphthong mode button */}
      <button
        onClick={toggleDiphthongMode}
        className={`mb-4 px-6 py-2 rounded-xl border font-semibold transition-all ${
          isDiphthongMode
            ? "bg-lime-300 border-lime-500 text-black shadow-inner"
            : "bg-white border-gray-300 hover:bg-lime-100"
        }`}
      >
        {isDiphthongMode
          ? firstVowel
            ? `Diphthong: ${firstVowel}_`
            : "Diphthong Mode (select first vowel)"
          : "➕ Diphthong Mode"}
      </button>

      <div className={containerStyle}>
        {IPA_KEYS_VOWELS.map((k) => (
          <button key={k} onClick={() => handleVowelClick(k)} className={buttonStyle}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
