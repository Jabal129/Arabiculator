import React, { useState, useMemo } from "react";

// Single-file React app (Vite) for the Smart Arabicization System
// - Step 1: choose consonant and vowel rosters via IPA on-screen keyboards
// - Step 2: choose writing system (Abjad / Alphabetic / Alpha-syllabary)
// - Step 3: see result mapping and use the result-letter keyboard to type into a read-only text box

// NOTE: Tailwind CSS classes are used in the markup. Install Tailwind in your Vite project or adapt styles.

// ---------------------------
// Data: consonant & vowel dictionaries (port of your mappings)
// ---------------------------
const CONSONANTS = {
  "b": "ب",
  "ɓ": "ٻ",
  "β": "ڥ",
  "ʙ": "ݒ",
  "c": "ګ",
  "ç": "ښ",
  "d": "د",
  "ɖ": "ڈ",
  "ɗ": "ڏ",
  "ᶑ": "ڐ",
  "ʣ": "ځ",
  "ʥ": "ڎ",
  "ʤ": "ج",
  "f": "ف",
  "ɸ": "ڢ",
  "g": "گ",
  "ɠ": "ڲ",
  "ɢ": "ݠ",
  "ʛ": "ݞ",
  "ɰ": "ۼ",
  "h": "ه",
  "ɦ": "ھ",
  "ħ": "ح",
  "ɧ": "ݼ",
  "ɥ": "ۍ",
  "ʜ": "ݮ",
  "j": "ي",
  "ʝ": "ږ",
  "ɟ": "ڰ",
  "ʄ": "ڿ",
  "k": "ك",
  "l": "ل",
  "ɫ": "ڵ",
  "ɬ": "ڛ",
  "ɮ": "ڷ",
  "ɭ": "لؕ",
  "ꞎ": "ݰ",
  "ʟ": "ࢦ",
  "m": "م",
  "ɱ": "ݥ",
  "n": "ن",
  "ɳ": "ڻ",
  "ɲ": "ڹ",
  "ŋ": "ڠ",
  "ɴ": "ڼ",
  "p": "پ",
  "q": "ق",
  "r": "ر",
  "ɹ": "ݛ",
  "ɾ": "ۮ",
  "ɽ": "ڑ",
  "ɻ": "ݱ",
  "ɺ": "ړ",
  "ʁ": "ڔ",
  "ʀ": "ݬ",
  "s": "س",
  "ʂ": "ݜ",
  "ɕ": "ڜ",
  "ʃ": "ش",
  "t": "ت",
  "ʈ": "ٹ",
  "ʦ": "څ",
  "ʨ": "ٿ",
  "ʧ": "چ",
  "v": "ڤ",
  "ⱱ": "ݕ",
  "ʋ": "ۋ",
  "w": "و",
  "ʍ": "ۅ",
  "ɣ": "غ",
  "x": "خ",
  "ʎ": "ڸ",
  "χ": "ݲ",
  "z": "ز",
  "ʐ": "ڙ",
  "ʑ": "ݫ",
  "ʒ": "ژ",
  "θ": "ث",
  "ð": "ذ",
  "ʔ": "ء",
  "ʡ": "أ",
  "ʕ": "ع",
  "ʢ": "ݴ",
  "ʘ": "مٙ",
  "ǀ": "ثٙ",
  "ǃ": "تٙ",
  "ǂ": "جٙ",
  "ǁ": "لٙ",
};

const VOWELS = {
  "i": { diacritic: "ِ", letter: "ي" },
  "y": { diacritic: "ࣾ", letter: "ۇ" },
  "ɨ": { diacritic: "ۧ", letter: "ٷ" },
  "ʉ": { diacritic: "ٌ", letter: "ٶ" },
  "ɯ": { diacritic: "ࣻ", letter: "ى" },
  "u": { diacritic: "ُ", letter: "و" },
  "ɪ": { diacritic: "ٍ", letter: "ے" },
  "ʏ": { diacritic: "ࣥ", letter: "ٷ" },
  "ʊ": { diacritic: "ࣳ", letter: "ٶ" },
  "e": { diacritic: "۫", letter: "ێ" },
  "ø": { diacritic: "۪", letter: "ۊ" },
  "ɘ": { diacritic: "࣬", letter: "ۂ" },
  "ɵ": { diacritic: "ࣴ", letter: "ۅ" },
  "ɤ": { diacritic: "ٚ", letter: "ۓ" },
  "o": { diacritic: "ٝ", letter: "ۆ" },
  "ə": { diacritic: "ۡ", letter: "ە" },
  "ɛ": { diacritic: "۬", letter: "ؽ" },
  "œ": { diacritic: "ࣱ", letter: "ۈ" },
  "ɜ": { diacritic: "࣯", letter: "ݶ" },
  "ɞ": { diacritic: "ࣷ", letter: "ݹ" },
  "ʌ": { diacritic: "ٛ", letter: "ݳ" },
  "ɔ": { diacritic: "ٗ", letter: "ۉ" },
  "æ": { diacritic: "َ", letter: "إ" },
  "ɐ": { diacritic: "ٰ", letter: "ݴ" },
  "a": { diacritic: "ً", letter: "ا" },
  "ɶ": { diacritic: "ࣽ", letter: "ۄ" },
  "ɑ": { diacritic: "ࣤ", letter: "آ" },
  "ɒ": { diacritic: "ࣺ", letter: "ۏ" },
};

// Ta'wil groups (weighted) - consonants
const PH_GROUPS = {
  "r": ["ɾ", "ʁ", "ɹ", "ɻ", "ɽ", "ɺ"],
  "l": ["ɫ", "ɭ", "ʎ"],
  "n": ["ŋ", "ɲ", "ɳ"],
  "t": ["ʈ", "ʦ", "ʨ", "θ"],
  "d": ["ɖ", "ʣ", "ʥ", "ð"],
  "k": ["ɟ", "c"],
  "g": ["ɠ", "ʛ"],
  "h": ["ħ", "ɦ", "ɧ"],
  "ʔ": ["ʡ", "ʢ"],
  "b": ["p", "β", "ɓ", "ʙ"],
  "ʤ": ["ʒ", "g", "ʥ", "ʣ", "ʧ", "ʨ", "ʦ"],
  "x": ["χ", "ç"],
  "z": ["ʣ", "ʒ", "ʑ", "ʐ", "ð"],
  "s": ["ʦ", "ʃ", "ɕ", "ʂ", "θ"],
  "ʃ": ["ɕ", "ʂ", "ç", "ʧ", "ɬ"],
  "ɣ": ["g", "ʁ", "ɢ", "ʝ"],
  "f": ["ɸ", "p", "v"],
  "q": ["ɢ"],
  "m": ["ɱ"],
  "w": ["v", "ʋ", "β", "ⱱ"],
};

const V_GROUPS = {
  "a": ["æ", "ɐ", "ɑ", "ɒ", "ɶ", "ʌ", "ɛ", "ɜ", "ɞ", "ə"],
  "i": ["ɪ", "e", "ɨ", "ɘ"],
  "u": ["ʊ", "o", "ʉ", "ɵ", "ʏ", "ø", "ɔ", "ɤ", "ɯ"],
};

// Diphthong grouping for connectors
const DIP_G = {
  fat7a: ["a", "æ", "ɑ", "ɒ", "ɶ", "ɐ", "ɛ", "ʌ"],
  kasra: ["i", "e", "ɪ", "ɨ", "ɘ", "y"],
  damma: ["u", "o", "ʊ", "ʉ", "ø", "ɵ", "ɤ", "ɯ", "ɔ"],
};

// ---------------------------
// Mapping logic (JS port)
// ---------------------------

function applyTa2wil(consonantList) {
  const interp = {};
  const set = new Set(consonantList);
  for (const [grand, marginals] of Object.entries(PH_GROUPS)) {
    if (set.has(grand)) continue;
    for (const m of marginals) {
      if (set.has(m)) {
        interp[m] = grand;
        break;
      }
    }
  }
  return interp;
}

function applyVowelTa2wil(vowelList) {
  const interp = {};
  const set = new Set(vowelList);
  for (const [grand, marginals] of Object.entries(V_GROUPS)) {
    if (set.has(grand)) continue;
    for (const m of marginals) {
      if (set.has(m)) {
        interp[m] = grand;
        break;
      }
    }
  }
  return interp;
}

function classify(v) {
  for (const [g, members] of Object.entries(DIP_G)) {
    if (members.includes(v)) return g;
  }
  return null;
}

function handleDiphthong(v1, v2, system) {
  if (system === "abjad") return "";
  if (system === "alphabetic") {
    if (VOWELS[v1] && VOWELS[v2]) return VOWELS[v1].letter + VOWELS[v2].letter;
    return "";
  }
  if (system === "alpha-syllabary") {
    const g1 = classify(v1);
    const g2 = classify(v2);
    let connector = "أ";
    if (g1 === "kasra" || g2 === "kasra") connector = "ئ";
    else if (g1 === "damma" || g2 === "damma") connector = "ؤ";
    if (VOWELS[v1] && VOWELS[v2]) return VOWELS[v1].diacritic + connector + VOWELS[v2].diacritic;
    return "";
  }
  return "";
}

function mapPhonemes(consonantList, vowelList, system) {
  const result = {};
  for (const c of consonantList) {
    if (!CONSONANTS[c]) continue;
    result[c] = {};
    for (const v of vowelList) {
      // diphthong token check (two-char token like "ai")
      if (v.length === 2 && VOWELS[v[0]] && VOWELS[v[1]]) {
        const out = handleDiphthong(v[0], v[1], system);
        result[c][v] = CONSONANTS[c] + out;
        continue;
      }
      if (!VOWELS[v]) continue;
      if (system === "abjad") result[c][v] = CONSONANTS[c];
      else if (system === "alphabetic") result[c][v] = CONSONANTS[c] + VOWELS[v].letter;
      else if (system === "alpha-syllabary") result[c][v] = CONSONANTS[c] + VOWELS[v].diacritic;
    }
  }
  return result;
}

function mapWithTa2wil(consonantList, vowelList, system) {
  const cInterp = applyTa2wil(consonantList);
  const vInterp = applyVowelTa2wil(vowelList);
  const updatedCs = consonantList.map((c) => (cInterp[c] ? cInterp[c] : c));
  const updatedVs = vowelList.map((v) => (vInterp[v] ? vInterp[v] : v));
  return mapPhonemes(updatedCs, updatedVs, system);
}

// ---------------------------
// Small UI pieces (keyboards)
// ---------------------------
const IPA_CONSONANT_KEYS = Object.keys(CONSONANTS);
const IPA_VOWEL_KEYS = Object.keys(VOWELS).concat(["ai", "au", "ia"]);

export default function App() {
  const [step, setStep] = useState(1);
  const [consonantRoster, setConsonantRoster] = useState([]);
  const [vowelRoster, setVowelRoster] = useState([]);
  const [system, setSystem] = useState(null); // "abjad" | "alphabetic" | "alpha-syllabary"
  const [mapping, setMapping] = useState({});
  const [typed, setTyped] = useState("");

  // Helpers to add phoneme tokens (no editing directly)
  function addConsonant(token) {
    setConsonantRoster((s) => (s.includes(token) ? s : [...s, token]));
  }
  function removeLastConsonant() {
    setConsonantRoster((s) => s.slice(0, -1));
  }
  function addVowel(token) {
    setVowelRoster((s) => (s.includes(token) ? s : [...s, token]));
  }
  function removeLastVowel() {
    setVowelRoster((s) => s.slice(0, -1));
  }

  function goToSystemChoice() {
    setStep(2);
  }

  function chooseSystem(choice) {
    setSystem(choice);
    // compute mapping
    const mapped = mapWithTa2wil(consonantRoster, vowelRoster, choice);
    setMapping(mapped);
    // prepare result step
    setStep(3);
  }

  const resultLetters = useMemo(() => {
    const set = new Set();
    Object.values(mapping).forEach((vm) => Object.values(vm).forEach((g) => set.add(g)));
    return Array.from(set).filter(Boolean);
  }, [mapping]);

  function pressResultKey(ch) {
    setTyped((t) => t + ch);
  }
  function backspace() {
    setTyped((t) => t.slice(0, -1));
  }
  function clearTyped() {
    setTyped("");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Smart Arabicization — Prototype UI</h1>

        {step === 1 && (
          <div>
            <h2 className="text-lg font-medium mb-2">Step 1 — Build phoneme rosters</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Consonants box */}
              <div>
                <label className="block text-sm font-semibold mb-1">Consonant roster (uneditable)</label>
                <div className="border rounded p-3 min-h-[56px] bg-gray-100">
                  {consonantRoster.length === 0 ? (
                    <span className="text-gray-400">(no consonants yet)</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {consonantRoster.map((c) => (
                        <span key={c} className="px-2 py-1 bg-white rounded border text-sm">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2 max-h-40 overflow-auto p-2 border rounded">
                  {IPA_CONSONANT_KEYS.map((k) => (
                    <button
                      key={k}
                      className="px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded text-sm"
                      onClick={() => addConsonant(k)}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-red-50 rounded" onClick={removeLastConsonant}>Back</button>
                  <button className="px-3 py-1 bg-gray-50 rounded" onClick={() => setConsonantRoster([])}>Clear</button>
                </div>
              </div>

              {/* Vowels box */}
              <div>
                <label className="block text-sm font-semibold mb-1">Vowel roster (uneditable)</label>
                <div className="border rounded p-3 min-h-[56px] bg-gray-100">
                  {vowelRoster.length === 0 ? (
                    <span className="text-gray-400">(no vowels yet)</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {vowelRoster.map((v) => (
                        <span key={v} className="px-2 py-1 bg-white rounded border text-sm">{v}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2 max-h-40 overflow-auto p-2 border rounded">
                  {IPA_VOWEL_KEYS.map((k) => (
                    <button
                      key={k}
                      className="px-2 py-1 bg-green-50 hover:bg-green-100 rounded text-sm"
                      onClick={() => addVowel(k)}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-red-50 rounded" onClick={removeLastVowel}>Back</button>
                  <button className="px-3 py-1 bg-gray-50 rounded" onClick={() => setVowelRoster([])}>Clear</button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={goToSystemChoice}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-medium mb-4">Step 2 — Choose writing system</h2>
            <div className="flex gap-4">
              <button onClick={() => chooseSystem("abjad")} className="flex-1 p-6 bg-yellow-50 rounded-lg border hover:shadow">🕋 Abjad<br/><span className="text-sm">No vowels shown</span></button>
              <button onClick={() => chooseSystem("alphabetic")} className="flex-1 p-6 bg-green-50 rounded-lg border hover:shadow">✒️ Alphabetic<br/><span className="text-sm">Full vowel letters</span></button>
              <button onClick={() => chooseSystem("alpha-syllabary")} className="flex-1 p-6 bg-blue-50 rounded-lg border hover:shadow">📜 Alpha-syllabary<br/><span className="text-sm">Vowel diacritics</span></button>
            </div>
            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-gray-50 rounded" onClick={() => setStep(1)}>Back</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-medium mb-2">Step 3 — Result & On-screen keyboard</h2>

            <div className="mb-4">
              <h3 className="font-semibold">Mapping preview</h3>
              <div className="max-h-40 overflow-auto border rounded p-2 bg-gray-50 mt-2">
                {Object.keys(mapping).length === 0 ? (
                  <span className="text-gray-400">(no mapping)</span>
                ) : (
                  Object.entries(mapping).map(([c, vm]) => (
                    <div key={c} className="mb-2">
                      <strong>{c}</strong>: 
                      {Object.entries(vm).map(([v, form]) => (
                        <span key={v} className="ml-2 inline-block px-2 py-1 bg-white border rounded">{v}→{form}</span>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Result letters keyboard</h3>
              <div className="mt-2 grid grid-cols-8 gap-2">
                {resultLetters.length === 0 ? (
                  <div className="text-gray-400">(no letters)</div>
                ) : (
                  resultLetters.map((ch) => (
                    <button key={ch} className="px-3 py-2 bg-indigo-50 rounded" onClick={() => pressResultKey(ch)}>{ch}</button>
                  ))
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold">Output (read-only) — use on-screen keyboard</label>
                <textarea readOnly value={typed} className="w-full h-28 mt-2 border rounded p-2 bg-gray-50" />
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 bg-red-50 rounded" onClick={backspace}>Backspace</button>
                  <button className="px-3 py-1 bg-gray-50 rounded" onClick={clearTyped}>Clear</button>
                </div>
              </div>

            </div>

            <div className="mt-6 flex justify-between">
              <button className="px-4 py-2 bg-gray-50 rounded" onClick={() => setStep(2)}>Back</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => { setStep(1); setConsonantRoster([]); setVowelRoster([]); setMapping({}); setTyped(""); }}>Start Over</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
