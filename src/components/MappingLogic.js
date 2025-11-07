export const CONSONANTS = {
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
  "ɾ": "ڒ",
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

export const VOWELS = {
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
  "æ": { diacritic: "ً", letter: "إ" },
  "ɐ": { diacritic: "ٰ", letter: "ݴ" },
  "a": { diacritic:"َ" , letter: "ا" },
  "ɶ": { diacritic: "ࣽ", letter: "ۄ" },
  "ɑ": { diacritic: "ࣤ", letter: "آ" },
  "ɒ": { diacritic: "ࣺ", letter: "ۏ" },
};

// Ta'wil groups (consonants) - weighted order (first is highest preference)
export const PH_GROUPS = {
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
  "ʤ": ["ʒ", "ʥ", "ʣ", "ʧ"],
  "x": ["χ", "ç"],
  "z": ["ʣ", "ʒ", "ʑ", "ʐ", "ð"],
  "s": ["ʦ", "ʃ", "ɕ", "ʂ", "θ"],
  "ʃ": ["ɕ", "ʂ", "ç", "ʧ", "ɬ", "ꞎ"],
  "ɣ": ["g", "ʁ", "ɢ", "ʝ"],
  "f": ["ɸ", "p", "v"],
  "q": ["ɢ"],
  "m": ["ɱ"],
  "w": ["v", "ʋ", "β", "ⱱ"],
  "ʧ": ["ʨ", "ʦ", "c"]};

export const V_GROUPS = {
  "a": ["æ", "ɐ", "ɑ", "ɒ", "ɶ", "ʌ", "ɛ", "ɜ", "ɞ", "ə"],
  "i": ["ɪ", "e", "ɨ", "ɘ"],
  "u": ["ʊ", "o", "ʉ", "ɵ", "ʏ", "ø", "ɔ", "ɤ", "ɯ", "y", "œ"],
};

export const DIP_G = {
  fat7a: ["æ", "ɐ", "ɑ", "ɒ", "ɶ", "ʌ", "ɛ", "ɜ", "ɞ", "ə"],
  kasra: ["ɪ", "e", "ɨ", "ɘ", "ɤ"],
  damma: ["ʊ", "o", "ʉ", "ɵ", "ʏ", "ø", "ɔ", "ɯ", "y", "œ"],
};

// Helpers
export function applyTa2wil(consonantList) {
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

export function applyVowelTa2wil(vowelList) {
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

export function classify(v) {
  for (const [g, members] of Object.entries(DIP_G)) if (members.includes(v)) return g;
  return null;
}

export function handleDiphthong(v1, v2, system) {
  if (system === 'abjad') return '';
  if (system === 'alphabetic') {
    if (VOWELS[v1] && VOWELS[v2]) return VOWELS[v1].letter + VOWELS[v2].letter;
    return '';
  }
  if (system === 'alpha-syllabary') {
    const g1 = classify(v1); const g2 = classify(v2);
    let connector = 'أ';
    if (g1 === 'kasra' || g2 === 'kasra') connector = 'ي';
    else if (g1 === 'damma' || g2 === 'damma') connector = 'و';
    if (VOWELS[v1] && VOWELS[v2]) return VOWELS[v1].diacritic + connector + VOWELS[v2].diacritic;
    return '';
  }
  return '';
}

export function mapPhonemes(consonantList, vowelList, system) {
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
      const fallback = applyVowelTa2wil([v]);
      if (!VOWELS[v] && fallback[v]) v = fallback[v];
      if (!VOWELS[v]) continue;
      if (system === 'abjad') result[c][v] = CONSONANTS[c];
      else if (system === 'alphabetic') result[c][v] = CONSONANTS[c] + VOWELS[v].letter;
      else if (system === 'alpha-syllabary') result[c][v] = CONSONANTS[c] + VOWELS[v].diacritic;
    }
  }
  return result;
}

export function mapWithTa2wil(consonantList, vowelList, system) {
  const cInterp = applyTa2wil(consonantList);
  const vInterp = applyVowelTa2wil(vowelList);
  const updatedCs = consonantList.map((c) => (cInterp[c] ? cInterp[c] : c));
  const updatedVs = vowelList.map((v) => (vInterp[v] ? vInterp[v] : v));
  return mapPhonemes(updatedCs, updatedVs, system);
}

