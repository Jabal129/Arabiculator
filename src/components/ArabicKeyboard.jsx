import React from "react";

export default function ArabicKeyboard({ mapping = {}, system = "abjad", onPress }) {
  // Build all forms from nested mapping
  const consonantForms = Object.entries(mapping).map(([c, vm]) => ({
    consonant: c,
    forms: Object.values(vm).filter(Boolean),
  }));

  let unvocalized = [];
  let vocalized = [];
  let standaloneVowels = [];
  let sukunForms = [];

  // --- Abjad ---
  if (system === "abjad") {
    // Just the base consonants (no diacritics)
    unvocalized = consonantForms
      .map((cf) => cf.forms[0]?.replace(/[\u064B-\u065F]/g, "")) // strip diacritics
      .filter(Boolean);
  }

  // --- Alphabetic ---
  else if (system === "alphabetic") {
    // All vocalized forms
    vocalized = consonantForms.flatMap((cf) => cf.forms);

    unvocalized = consonantForms
    .map((cf) => cf.forms[0]?.[0] ?? "")
    .filter(Boolean);

    // Collect unique vowel letters from last character of forms
    const vowelLetters = new Set();
    consonantForms.forEach((cf) => {
      cf.forms.forEach((form) => {
        const lastChar = form.slice(-1);
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0870-\u089F\uFB50-\uFDFF\uFE70-\uFEFF\u1EE00-\u1EEFF]/g
.test(lastChar)) vowelLetters.add(lastChar);
      });
    });
    standaloneVowels = Array.from(vowelLetters).map((v) => `ئ${v}`);
  }

  // --- Alpha-syllabary ---
  else if (system === "alpha-syllabary") {
    // All vocalized forms (with diacritics)
    vocalized = consonantForms.flatMap((cf) => cf.forms);

    // Sukun (remove diacritic + add sukun mark)
    sukunForms = consonantForms
      .map((cf) => cf.forms[0]?.replace(/[\u064B-\u065F]/g, "") + "ْ")
      .filter(Boolean);

    // Collect diacritics and make standalone vowel marks
    const diacritics = new Set();
    consonantForms.forEach((cf) =>
      cf.forms.forEach((form) => {
        const lastChar = form.slice(-1);
        if (/[\u064B-\u06FF]/.test(lastChar)) diacritics.add(lastChar);
      })
    );
    standaloneVowels = Array.from(diacritics).map((d) => `ا${d}`);
  }

  const renderRow = (title, items) =>
    items.length ? (
      <div className="my-4 text-center" key={title}>
        <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((char, i) => (
            <button
              key={i}
              onClick={() => onPress(char)}
              className="px-4 py-2 bg-white text-black rounded-xl text-xl border border-gray-300 shadow-sm hover:bg-lime-100 active:scale-95 transition-all"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className="p-6 bg-gray-100 rounded-3xl w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Arabic Keyboard</h2>

      {system === "abjad" && renderRow("Unvocalized Consonants", unvocalized)}
      {system === "alphabetic" && (
        <>
            {renderRow("Unvocalized Consonants", unvocalized)}
          {renderRow("Vocalized Consonants", vocalized)}
          {renderRow("Standalone Vowels (ئ + vowel)", standaloneVowels)}
        </>
      )}
      {system === "alpha-syllabary" && (
        <>
          {renderRow("Unvocalized (Sukun)", sukunForms)}
          {renderRow("Vocalized Consonants", vocalized)}
          {renderRow("Standalone Vowels (ا + vowel)", standaloneVowels)}
        </>
      )}
    </div>
  );
}
