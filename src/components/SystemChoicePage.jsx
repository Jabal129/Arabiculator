// src/components/SystemChoicePage.jsx
import React from "react";

export default function SystemChoicePage({ onSelectSystem }) {
  if (!onSelectSystem) {
    console.warn("⚠️ onSelectSystem prop missing in SystemChoicePage");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f0fff3] text-black">
      <h2 className="text-3xl font-bold mb-8">Choose Writing System</h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <button
          onClick={() => onSelectSystem("abjad")}
          className="w-full py-4 text-xl bg-white text-black border border-lime-600 rounded-2xl shadow-md hover:bg-lime-200 transition-all"
        >
          🕌 Abjad
        </button>

        <button
          onClick={() => onSelectSystem("alphabetic")}
          className="w-full py-4 text-xl bg-white text-black border border-lime-600 rounded-2xl shadow-md hover:bg-lime-200 transition-all"
        >
          ✒️ Alphabetic
        </button>

        <button
          onClick={() => onSelectSystem("alpha-syllabary")}
          className="w-full py-4 text-xl bg-white text-black border border-lime-600 rounded-2xl shadow-md hover:bg-lime-200 transition-all"
        >
          🔤 Alpha-syllabary (Vocalized Abjad)
        </button>
          <button
            onClick={() => window.location.reload()} // or use a prop like onBack() if you want to handle it in App.jsx
            className="w-full py-4 text-xl bg-lime-100 text-black border border-lime-600 rounded-2xl shadow-md hover:bg-lime-200 transition-all"
  >
            ⬅️ Back
  </       button>
      </div>
    </div>
  );
}
