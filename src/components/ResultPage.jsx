import React, { useState } from "react";
import ArabicKeyboard from "./ArabicKeyboard";

export default function ResultPage({ mapping, system = "abjad", onRestart }) {
  const [typed, setTyped] = useState("");

  return (
    <div className="p-6 flex flex-col items-center text-black">
      <h2 className="text-3xl font-bold mb-6">Result</h2>

      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-2xl shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Mapping Preview</h3>
        <div className="max-h-60 overflow-auto">
          {Object.entries(mapping).map(([c, vm]) => (
            <div key={c} className="mb-2">
              <strong>{c}</strong>:{" "}
              {Object.entries(vm).map(([v, f]) => (
                <span
                  key={v}
                  className="inline-block px-2 py-1 bg-lime-50 border rounded mx-1"
                >
                  {v} → {f}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Correct keyboard rendering */}
      <ArabicKeyboard
        mapping={mapping}
        system={system}
        onPress={(ch) => setTyped((t) => t + ch)}
      />

      <textarea
        readOnly
        value={typed}
        className="w-full max-w-2xl h-24 p-3 border rounded-lg bg-gray-100 text-lg mt-6"
      />

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setTyped((t) => t.slice(0, -1))}
          className="px-4 py-2 bg-white text-black border border-lime-600 rounded-2xl shadow hover:bg-lime-200"
        >
          Backspace
        </button>
        <button
          onClick={() => setTyped("")}
          className="px-4 py-2 bg-white text-black border border-lime-600 rounded-2xl shadow hover:bg-lime-200"
        >
          Clear
        </button>
        <button
          onClick={() => setTyped((t) => t + " ")}
          className="px-4 py-2 bg-white text-black border border-lime-600 rounded-2xl shadow hover:bg-lime-200"
        >
          Space
        </button>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-lime-600 text-white font-semibold rounded-2xl shadow hover:bg-lime-500"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
